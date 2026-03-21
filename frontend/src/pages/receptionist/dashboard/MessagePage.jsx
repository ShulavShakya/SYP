import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

const tabs = ["All", "Unread", "Active"];

const conversations = [
  {
    id: 1,
    role: "patient",
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
    role: "patient",
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
    role: "patient",
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
    role: "patient",
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
    role: "patient",
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
    role: "patient",
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
    role: "patient",
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
    role: "patient",
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

function Avatar({ name, avatar, active, size = "h-12 w-12" }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-surface-container-highest ${size}`}
    >
      {avatar ? (
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="material-symbols-outlined text-outline">person</span>
        </div>
      )}

      {active ? (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-primary" />
      ) : null}
    </div>
  );
}

export default function MessagesPage() {
  const outletContext = useOutletContext();
  const setHideTopbar = outletContext?.setHideTopbar ?? (() => {});

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const filteredConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return conversations.filter((item) => {
      const isAllowedConversation = item.role === "patient";

      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.lastMessage.toLowerCase().includes(normalizedSearch) ||
        item.patientId.toLowerCase().includes(normalizedSearch) ||
        item.department.toLowerCase().includes(normalizedSearch);

      const matchesTab =
        activeTab === "All"
          ? true
          : activeTab === "Unread"
            ? item.unread
            : item.active;

      return isAllowedConversation && matchesSearch && matchesTab;
    });
  }, [activeTab, search]);

  const activeConversation =
    filteredConversations.find((item) => item.id === activeConversationId) ||
    conversations.find((item) => item.id === activeConversationId) ||
    null;

  const activeMessages = activeConversation
    ? messagesByConversation[activeConversation.id] || []
    : [];

  const showChatView = Boolean(activeConversation);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  useEffect(() => {
    setHideTopbar(false);
    return () => {
      setHideTopbar(false);
    };
  }, [setHideTopbar]);

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-[#f7fafa] font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="flex h-full min-h-0 overflow-hidden">
        <section
          className={[
            "flex h-full min-h-0 shrink-0 flex-col bg-[#f7fafa] md:w-[380px] md:border-r md:border-slate-100 xl:w-[400px]",
            showChatView ? "hidden md:flex" : "flex w-full",
          ].join(" ")}
        >
          <div className="shrink-0 border-b border-slate-100 bg-white/60 px-4 py-5 backdrop-blur-sm">
            <div className="mb-4">
              <h1 className="text-2xl font-black tracking-tight text-[#006565]">
                Messages
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Manage patient conversations and check-ins
              </p>
            </div>

            <div className="relative mb-4 flex items-center rounded-full bg-[#f1f4f4] px-4 py-2 ring-[#006565]/20 transition-all focus-within:ring-2">
              <span className="material-symbols-outlined text-xl text-slate-400">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients, IDs, or departments..."
                className="w-full border-none bg-transparent pl-2 text-sm font-medium outline-none focus:ring-0"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab
                      ? "whitespace-nowrap rounded-full bg-[#006565] px-4 py-1.5 text-xs font-bold text-white"
                      : "whitespace-nowrap rounded-full border border-slate-100 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:bg-[#ebeeee]"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            <div className="space-y-2">
              {filteredConversations.length === 0 ? (
                <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                  <p className="text-sm font-semibold text-slate-600">
                    No conversations found.
                  </p>
                </div>
              ) : (
                filteredConversations.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveConversationId(item.id)}
                    className={[
                      "flex w-full gap-4 rounded-2xl p-4 text-left transition-colors",
                      activeConversation?.id === item.id
                        ? "border-l-4 border-[#006565] bg-white shadow-sm"
                        : "hover:bg-white/70",
                    ].join(" ")}
                  >
                    <Avatar
                      name={item.name}
                      avatar={item.avatar}
                      active={item.active}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-start justify-between gap-3">
                        <h4 className="truncate text-sm font-bold text-[#181c1d]">
                          {item.name}
                        </h4>
                        <span className="shrink-0 text-[10px] font-medium text-slate-400">
                          {item.time}
                        </span>
                      </div>

                      <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#006565]">
                        {item.patientId} • {item.department}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-xs font-medium text-slate-500">
                          {item.lastMessage}
                        </p>

                        {item.unread ? (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#006565] px-1.5 text-[10px] font-black text-white">
                            •
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

        <section
          className={[
            "flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white",
            showChatView ? "flex" : "hidden md:flex",
          ].join(" ")}
        >
          {activeConversation ? (
            <>
              <header className="shrink-0 border-b border-slate-50 bg-white/80 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <button
                      onClick={() => setActiveConversationId(null)}
                      className="material-symbols-outlined rounded-xl p-2 text-slate-400 transition-all hover:bg-[#f1f4f4] hover:text-[#006565] md:hidden"
                    >
                      arrow_back
                    </button>

                    <Avatar
                      name={activeConversation.name}
                      avatar={activeConversation.avatar}
                      active={activeConversation.active}
                      size="h-11 w-11"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-[#181c1d]">
                        {activeConversation.name}
                      </h3>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="shrink-0 rounded-full bg-[#93f2f2] px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-[#002020]">
                          {activeConversation.status}
                        </span>
                        <span className="truncate text-[11px] font-medium text-slate-400">
                          {activeConversation.patientId} •{" "}
                          {activeConversation.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-[#f1f4f4] hover:text-[#006565]">
                      <span className="material-symbols-outlined">phone</span>
                    </button>
                    <button className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-[#f1f4f4] hover:text-[#006565]">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto bg-[#fcfdfd] p-6">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Today
                    </span>
                  </div>

                  {activeMessages.map((message) =>
                    message.sender === "patient" ? (
                      <div
                        key={message.id}
                        className="flex max-w-[80%] items-end gap-3"
                      >
                        <div className="min-w-0">
                          <div className="rounded-r-2xl rounded-t-2xl bg-[#f1f4f4] p-4 text-sm leading-relaxed text-[#181c1d] shadow-sm">
                            {message.text}
                          </div>
                          <span className="ml-1 mt-1 block text-[10px] text-slate-400">
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={message.id}
                        className="ml-auto flex max-w-[80%] flex-col items-end gap-1"
                      >
                        <div className="rounded-l-2xl rounded-t-2xl bg-gradient-to-br from-[#006565] to-[#008080] p-4 text-sm leading-relaxed text-white shadow-md">
                          {message.text}
                        </div>
                        <div className="mr-1 mt-1 flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">
                            {message.time}
                          </span>
                          <span className="material-symbols-outlined text-[14px] text-[#006565]">
                            done_all
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-3">
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      className="shrink-0 rounded-full border border-[#006565]/15 bg-[#f7fafa] px-4 py-2 text-xs font-semibold text-[#006565] transition-all hover:bg-[#006565] hover:text-white"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shrink-0 border-t border-slate-50 bg-white p-6">
                <div className="group flex items-center gap-4 rounded-2xl bg-[#ebeeee] px-4 py-3 shadow-inner">
                  <button className="p-1 text-slate-400 transition-colors hover:text-[#006565]">
                    <span className="material-symbols-outlined">
                      attach_file
                    </span>
                  </button>

                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    placeholder="Type your message..."
                    className="flex-1 border-none bg-transparent text-sm font-medium text-[#181c1d] outline-none focus:ring-0"
                  />

                  <button
                    onClick={handleSend}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006565] text-white shadow-lg shadow-[#006565]/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      send
                    </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden flex-1 items-center justify-center bg-[#fcfdfd] md:flex">
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ebf7f7]">
                  <span className="material-symbols-outlined text-[#006565]">
                    chat
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Select a conversation
                </h3>
                <p className="mt-2 max-w-sm text-sm font-medium text-slate-500">
                  Choose a patient conversation from the left panel to start
                  managing messages.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
