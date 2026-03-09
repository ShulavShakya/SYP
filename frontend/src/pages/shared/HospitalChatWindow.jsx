import React, { useMemo, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Paperclip,
  SendHorizonal,
  Smile,
  Check,
  CheckCheck,
  X,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "doctor",
    text: "Hello Sarah, your lab report is ready for review.",
    time: "09:12 AM",
    status: "read",
  },
  {
    id: 2,
    sender: "patient",
    text: "Thank you doctor 🙂 Can I get a summary?",
    time: "09:13 AM",
    status: "read",
  },
  {
    id: 3,
    sender: "doctor",
    text: "Yes, I’ll send it shortly.",
    time: "09:14 AM",
    status: "delivered",
  },
];

function MessageStatus({ status }) {
  if (status === "sent") {
    return <Check size={14} className="text-textSecondary" />;
  }
  if (status === "delivered") {
    return <CheckCheck size={14} className="text-textSecondary" />;
  }
  return <CheckCheck size={14} className="text-primary" />;
}

function formatNow() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HospitalChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);

  const canSend = useMemo(() => {
    return message.trim().length > 0 || attachments.length > 0;
  }, [message, attachments]);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSend = () => {
    if (!canSend) return;

    const attachmentText =
      attachments.length > 0
        ? ` [Attachment${attachments.length > 1 ? "s" : ""}: ${attachments
            .map((f) => f.name)
            .join(", ")}]`
        : "";

    const newMessage = {
      id: Date.now(),
      sender: "patient",
      text: `${message.trim()}${attachmentText}`.trim(),
      time: formatNow(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setAttachments([]);
    setShowEmojiPicker(false);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: "delivered" } : m,
        ),
      );
      setIsOtherTyping(true);
    }, 700);

    setTimeout(() => {
      setIsOtherTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "doctor",
          text: "Received. I’ll check and get back to you shortly 👩‍⚕️",
          time: formatNow(),
          status: "read",
        },
      ]);
    }, 2200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePickFile = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeAttachment = (name) => {
    setAttachments((prev) => prev.filter((f) => f.name !== name));
  };

  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOtherTyping]);

  return (
    <div className="flex h-[700px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-divider bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-divider px-6 py-4">
        <div>
          <h2 className="text-lg font-bold text-textMain">Patient Messaging</h2>
          <p className="text-sm text-textSecondary">
            Secure communication with care team
          </p>
        </div>
        <div className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-primary">
          Encrypted
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-background px-5 py-5">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isMe = msg.sender === "patient";

            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                    isMe
                      ? "bg-primary text-white"
                      : "border border-divider bg-card text-textMain"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-6">
                    {msg.text}
                  </p>

                  <div
                    className={`mt-2 flex items-center justify-end gap-1 text-[11px] ${
                      isMe ? "text-white/80" : "text-textSecondary"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {isMe && <MessageStatus status={msg.status} />}
                  </div>
                </div>
              </div>
            );
          })}

          {isOtherTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-divider bg-card px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-textSecondary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-textSecondary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-textSecondary" />
                </div>
              </div>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="border-t border-divider bg-card px-4 py-4">
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments.map((file) => (
              <div
                key={file.name}
                className="inline-flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-medium text-textMain"
              >
                <span className="max-w-[180px] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(file.name)}
                  className="text-textSecondary hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handlePickFile}
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="rounded-xl p-3 text-textSecondary transition hover:bg-mint/10 hover:text-primary"
            >
              <Smile size={20} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-14 left-0 z-50">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  skinTonesDisabled
                  searchDisabled={false}
                  previewConfig={{ showPreview: false }}
                  height={380}
                  width={320}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl p-3 text-textSecondary transition hover:bg-mint/10 hover:text-primary"
          >
            <Paperclip size={20} />
          </button>

          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a secure message..."
            className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-divider bg-background px-4 py-3 text-sm text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizonal size={18} />
            Send
          </button>
        </div>

        <p className="mt-2 text-xs text-textSecondary">
          Press Enter to send, Shift + Enter for a new line.
        </p>
      </div>
    </div>
  );
}
