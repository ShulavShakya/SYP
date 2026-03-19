import React, { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const filters = ["All", "Unread", "Active"];

const conversations = [
  {
    id: 1,
    name: "Sarah Jenkins",
    lastMessage: "I've arrived at the parking lot...",
    time: "10:45 AM",
    active: true,
    unread: true,
    status: "Checked-in",
    patientId: "CS-99201",
    department: "Cardiology Dept",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtqHfnisBzGx3aMWoPG5pHYP4DzlmBWcEUlMm1wOGTa8kuQDcZ8fzTuRQkpDBzv03wCGim1QBAVadUY15ugQ0EGfwoAxlCtAVFlZTvgWNWro32WrrwOwvOpR6XwCl-HpysX4rXdZAeeM1zcy2_EB_tneFuQ_OTr5pVR9Ore7FYAAIzqaGPxN1b84YxJ3KYdqgTmUmZaY1YDoDaEqUr2ORMjHDIki6PkLu54TLcbvoiGLEZJ2Kv17FSWuIbv9LQiR4JK5XRMjrNfdth",
  },
  {
    id: 2,
    name: "Michael Chen",
    lastMessage: "Thank you for the prescription info.",
    time: "Yesterday",
    active: false,
    unread: false,
    status: "Follow-up",
    patientId: "CS-99202",
    department: "Neurology Dept",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDE2akKb_tiuNheBm7n1Q9nmg1Ip5tWCoJNZtWpfCSdHxRt3VQCOAKAWQlmbrS6IwQ3ij3tXtb9wTw8ULTv_qSJmhSjJB8exFwkgHW_YmXzn-EPWVtpjjZ96Vvl8vWsq2bHGo6LVMlY4zpTd89JmRRFzguHwdzIyZv4I0kNMo26US7Tgv16CTJx0OHk0qG27qFAQD2TDIWzyCwZSGmiIXRMY_-8aoscmbMHCBCSbajDV9rYXuGcFkKptRasCkz7RniVULcRjfYEciy_",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    lastMessage: "Is Dr. Smith running on time today?",
    time: "9:12 AM",
    active: false,
    unread: true,
    status: "Waiting",
    patientId: "CS-99203",
    department: "Orthopedics Dept",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJFh6r7lkaZ_HQ8FtzHMmJrMKjGp-e1aeeWaW0oCSC3q_vVLw39b58Srd0SsvfQiVP2YpVlw8gMGed20jF8SVw3jI6i3hKgFRV8EIH6oDzCc8AVtQdx5pikRAVctKxTOcGzjSN28nQs7Su9S_2QIOdQxQCzJFKXEgnUha6QKvggXgQPXQpnh__z_I4mtcqYf_W-JgN51UoYBO5ag6eviof1rTFA3a8Yy9x5injNOZBs189NEiozQOaAvJJFcc506syr6h98LgiKtPQ",
  },
  {
    id: 4,
    name: "Patient #4829",
    lastMessage: "Requesting appointment reschedule...",
    time: "08:00 AM",
    active: false,
    unread: false,
    status: "Active",
    patientId: "CS-99204",
    department: "Pediatrics Dept",
    avatar: null,
  },
  {
    id: 5,
    name: "Patient #4830",
    lastMessage: "Can I upload my previous reports?",
    time: "08:05 AM",
    active: true,
    unread: false,
    status: "Active",
    patientId: "CS-99205",
    department: "General Medicine",
    avatar: null,
  },
  {
    id: 6,
    name: "Patient #4831",
    lastMessage: "Please confirm my arrival time.",
    time: "08:10 AM",
    active: false,
    unread: true,
    status: "Unread",
    patientId: "CS-99206",
    department: "ENT",
    avatar: null,
  },
  {
    id: 7,
    name: "Patient #4832",
    lastMessage: "I need directions to the lab.",
    time: "08:15 AM",
    active: false,
    unread: false,
    status: "Active",
    patientId: "CS-99207",
    department: "Radiology",
    avatar: null,
  },
  {
    id: 8,
    name: "Patient #4833",
    lastMessage: "I'm running 10 minutes late.",
    time: "08:20 AM",
    active: true,
    unread: true,
    status: "Unread",
    patientId: "CS-99208",
    department: "Cardiology Dept",
    avatar: null,
  },
];

const messagesByConversation = {
  1: [
    {
      id: 1,
      sender: "patient",
      text: "Good morning, I've just arrived at the clinic. I'm parked in Spot B4. Do I need to come up to the reception desk or should I wait here?",
      time: "10:42 AM",
    },
    {
      id: 2,
      sender: "receptionist",
      text: "Welcome, Sarah! Please stay in your vehicle for a moment. Dr. Miller is just finishing with her previous patient. I'll send you a notification when it's time to head to Suite 302.",
      time: "10:44 AM",
    },
    {
      id: 3,
      sender: "patient",
      text: "Perfect, thank you. I have my insurance card ready as well.",
      time: "10:45 AM",
    },
  ],
  2: [
    {
      id: 1,
      sender: "patient",
      text: "Thank you for the prescription info.",
      time: "Yesterday",
    },
  ],
  3: [
    {
      id: 1,
      sender: "patient",
      text: "Is Dr. Smith running on time today?",
      time: "9:12 AM",
    },
  ],
};

const quickActions = [
  "Send appointment reminder",
  "Share check-in instructions",
  "Request documents",
];

const mobileNavItems = [
  { label: "Alerts", icon: "notifications_active", active: false },
  { label: "Chats", icon: "chat", active: true, filled: true },
  { label: "Directory", icon: "contact_page", active: false },
  { label: "Profile", icon: "account_circle", active: false },
];

export default function MessagesPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [search, setSearch] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const { setHideTopbar } = useOutletContext();

  const filteredConversations = useMemo(() => {
    return conversations.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.lastMessage.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        selectedFilter === "All"
          ? true
          : selectedFilter === "Unread"
            ? item.unread
            : item.active;

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) || null;

  const selectedMessages = selectedConversation
    ? messagesByConversation[selectedConversation.id] || []
    : [];

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  const showChatView = !!selectedConversation;
  useEffect(() => {
    setHideTopbar(showChatView);

    return () => {
      setHideTopbar(false);
    };
  }, [showChatView, setHideTopbar]);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <main className="flex min-h-screen flex-col">
        {!showChatView ? (
          <section className="flex h-[calc(100vh-4rem)] w-full flex-col">
            <div className="space-y-4 p-4">
              {/* <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border-none bg-surface-container-highest py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div> */}

              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={
                      selectedFilter === filter
                        ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white"
                        : "rounded-full bg-surface-container-high px-4 py-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                    }
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto">
              {filteredConversations.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedConversationId(item.id)}
                  className="flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-container-low"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-container-highest">
                    {item.avatar ? (
                      <img
                        alt={item.name}
                        className="h-full w-full object-cover"
                        src={item.avatar}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="material-symbols-outlined text-outline">
                          person
                        </span>
                      </div>
                    )}
                    {item.active && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-primary" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="truncate text-sm font-semibold text-on-surface">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-outline">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="truncate text-xs text-on-surface-variant">
                        {item.lastMessage}
                      </p>
                      {item.unread && (
                        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="flex h-[calc(100vh-4rem)] flex-1 flex-col bg-surface-container-lowest">
            <div className="flex items-center justify-between bg-white px-6 py-4 shadow-[0_2px_10px_rgba(0,101,101,0.03)]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedConversationId(null)}
                  className="material-symbols-outlined text-outline"
                >
                  arrow_back
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline text-lg font-bold text-[#2C3E50]">
                      {selectedConversation.name}
                    </h2>
                    <span className="rounded bg-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">
                      {selectedConversation.status}
                    </span>
                  </div>
                  <p className="text-xs text-outline">
                    ID: {selectedConversation.patientId} •{" "}
                    {selectedConversation.department}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="material-symbols-outlined rounded-full p-2 text-primary transition-colors hover:bg-surface-container">
                  phone
                </button>
                <button className="material-symbols-outlined rounded-full p-2 text-primary transition-colors hover:bg-surface-container">
                  more_vert
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto bg-[#F7FAFA] p-6">
              <div className="flex justify-center">
                <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-outline">
                  Today
                </span>
              </div>

              {selectedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex max-w-[85%] ${
                    message.sender === "receptionist"
                      ? "ml-auto justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex flex-col space-y-1 ${
                      message.sender === "receptionist" ? "items-end" : ""
                    }`}
                  >
                    <div
                      className={`p-4 text-sm leading-relaxed shadow-sm ${
                        message.sender === "receptionist"
                          ? "rounded-2xl rounded-tr-none bg-primary-container text-white shadow-md"
                          : "rounded-2xl rounded-tl-none border border-outline-variant/10 bg-white text-on-surface"
                      }`}
                    >
                      {message.text}
                    </div>
                    <p
                      className={`text-[10px] text-outline ${
                        message.sender === "receptionist" ? "mr-1" : "ml-1"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-outline-variant/15 bg-surface px-6 py-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="shrink-0 rounded-full border border-primary/20 bg-surface-container-lowest px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 bg-white px-6 pb-8 pt-4">
              <button className="material-symbols-outlined text-outline transition-colors hover:text-primary">
                attach_file
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="w-full rounded-2xl border-none bg-surface-container-highest px-5 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                onClick={handleSend}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform active:scale-95"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  send
                </span>
              </button>
            </div>
          </section>
        )}
      </main>

      {!showChatView && (
        <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-white/80 px-4 pb-6 pt-2 shadow-[0_-8px_30px_rgba(0,101,101,0.08)] backdrop-blur-xl dark:bg-slate-900/80 md:hidden">
          {mobileNavItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={
                item.active
                  ? "flex -translate-y-2 scale-110 flex-col items-center justify-center rounded-2xl bg-[#008080] p-3 text-white transition-all"
                  : "flex flex-col items-center justify-center p-2 text-slate-400"
              }
            >
              <span
                className="material-symbols-outlined"
                style={
                  item.filled
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="mt-1 font-body text-[10px] uppercase tracking-wide">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
