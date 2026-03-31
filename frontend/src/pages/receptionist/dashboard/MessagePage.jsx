import React, { useEffect, useMemo, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { privateAPI } from "../../../auth/config/api";

// --- Helper Components (Kept exact design) ---
function Avatar({ name, avatar, active, size = "h-12 w-12" }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-slate-200 ${size}`}
    >
      {avatar ? (
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">person</span>
        </div>
      )}
      {active && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
}

export default function MessagesPage() {
  const outletContext = useOutletContext();
  const setHideTopbar = outletContext?.setHideTopbar ?? (() => {});

  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await privateAPI.get("/users/api/conversations/");
        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await privateAPI.get(
          `users/api/conversations/${activeConversationId}/messages/`,
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();

    const token = sessionStorage.getItem("access");
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${protocol}://10.124.177.239:8000/ws/chat/${activeConversationId}/?token=${token}`;

    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender_type: data.sender_type,
          sender_id: data.sender_id,
          sender_name: data.sender_name,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

      setConversations((prevList) =>
        prevList.map((c) =>
          c.id === activeConversationId
            ? {
                ...c,
                last_message: data.message,
                updated_at: new Date().toISOString(),
              }
            : c,
        ),
      );
    };

    return () => {
      socketRef.current?.close();
    };
  }, [activeConversationId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!messageInput.trim() || !socketRef.current) return;

    const payload = {
      message: messageInput,
    };

    socketRef.current.send(JSON.stringify(payload));
    setMessageInput("");
  };

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId),
    [activeConversationId, conversations],
  );

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) =>
      c.patient_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [conversations, search]);

  const showChatView = Boolean(activeConversationId);

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-[#f7fafa] font-body text-on-surface">
      <div className="flex h-full min-h-0">
        <section
          className={`flex h-full shrink-0 flex-col bg-[#f7fafa] md:w-[380px] md:border-r border-slate-100 ${showChatView ? "hidden md:flex" : "flex w-full"}`}
        >
          <div className="p-4 bg-white/60 backdrop-blur-sm border-b border-slate-100">
            <h1 className="text-2xl font-black text-[#006565]">Messages</h1>
            <input
              type="text"
              placeholder="Search patients..."
              className="mt-4 w-full rounded-full bg-[#f1f4f4] px-4 py-2 text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredConversations.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveConversationId(item.id)}
                className={`flex w-full gap-4 rounded-2xl p-4 transition-all ${activeConversationId === item.id ? "bg-white shadow-sm border-l-4 border-[#006565]" : "hover:bg-white/50"}`}
              >
                <Avatar name={item.patient_name} active={true} />
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <h4 className="truncate text-sm font-bold">
                      {item.patient_name}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {item.updated_at
                        ? new Date(item.updated_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500">
                    {item.last_message || "No messages yet"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          className={`flex-1 flex-col bg-white ${showChatView ? "flex" : "hidden md:flex"}`}
        >
          {activeConversation ? (
            <>
              <header className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveConversationId(null)}
                    className="md:hidden material-symbols-outlined"
                  >
                    arrow_back
                  </button>
                  <Avatar
                    name={activeConversation.patient_name}
                    size="h-10 w-10"
                  />
                  <div>
                    <h3 className="font-bold">
                      {activeConversation.patient_name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {activeConversation.patient_id_str}
                    </p>
                  </div>
                </div>
              </header>

              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fcfdfd]"
              >
                {messages.map((msg, idx) => {
                  const isPatient = msg.sender_type === "PATIENT";
                  return (
                    <div
                      key={idx}
                      className={`flex ${isPatient ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl p-4 text-sm shadow-sm ${
                          isPatient
                            ? "bg-[#f1f4f4] text-slate-800 rounded-tl-none"
                            : "bg-[#006565] text-white rounded-tr-none"
                        }`}
                      >
                        {!isPatient && (
                          <div className="text-[10px] font-bold mb-1 opacity-70">
                            Staff: {msg.sender_name}
                          </div>
                        )}

                        {msg.message}

                        <div
                          className={`text-[10px] mt-1 opacity-70 ${isPatient ? "text-slate-500" : "text-teal-100"}`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 border-t border-slate-100">
                <div className="flex items-center gap-4 bg-[#f1f4f4] rounded-2xl px-4 py-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="h-10 w-10 bg-[#006565] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl block mb-2">
                  chat_bubble
                </span>
                <p>Select a patient to view shared chat history</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
