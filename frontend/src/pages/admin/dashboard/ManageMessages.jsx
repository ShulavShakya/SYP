import React, { useMemo, useState } from "react";

const tabs = ["All", "Doctors", "Staff"];

const conversations = [
  {
    id: 1,
    name: "Dr. Julian Vance",
    type: "doctor",
    role: "Cardiologist",
    time: "10:45 AM",
    preview: "The pathology reports for Room 402 are still pending...",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC317omYQXbpZyz6MoP9h-uSQwvW7XWmdaY3IDmMOoBao8diiuXRL5Swt9Rdn4Kij1TOjNg0cZAaY9JY2wG7jpwsuZuxcMoayznRvfLqaFhRt4Ui_1zbuuPdDTnL11Fp2Ps7NjLhvt4q7L_SrzK58WUSneFM0cr48_7uX6FS0mtb2nyYlhLhZWMGfHBKy09RTaylaEu1-q4lGWuJyVCrecliUeZTfstDQXPJJbCjQcMxMSG-78xfjaxZC59_-wOzZ_WAiNLr2ujyurJ",
    online: true,
    unread: 0,
  },
  {
    id: 2,
    name: "Dr. Amelia Hart",
    type: "doctor",
    role: "Neurologist",
    time: "09:35 AM",
    preview: "Please confirm the MRI slot for tomorrow morning.",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    online: false,
    unread: 1,
  },
  {
    id: 3,
    name: "Mark Stevens",
    type: "staff",
    role: "Receptionist",
    time: "Yesterday",
    preview: "All surgical schedules for tomorrow have been updated.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlmyduXohBsgrLlrVBlJouDAFGlu6OPr2-JbWcffD9A8bu2C0j9Ns0md3cZbezt9_nUsrofZgKhx33Pxb6z1VfKpSTn8UU83fmnxWFRcPp1KDBfo-AAFG3hmqsYm-7JsC069G49nFEG-u-ZAHFOXfxv7gyr63idgAdlHJRntA6kn5bAVSj7k6hl73QgMhVkyjbjAanp6sc6mCen0p-x2lAHYHa-GhAVYfq8irQRGPHPo9BTVJ06L3btFt2z7miK7ywfZjm5g15lAPr",
    online: false,
    unread: 0,
  },
  {
    id: 4,
    name: "Nina Brooks",
    type: "staff",
    role: "Receptionist",
    time: "08:10 AM",
    preview: "Two walk-in patients have been added to the afternoon queue.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    online: true,
    unread: 3,
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    type: "patient",
    role: "Patient • ID-2294",
    time: "09:12 AM",
    preview: "When will my lab results be available?",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDF2gr0bbK8SnVL94SUqAVDelgWC1MpOkrZvTKsSRuvImcC9UVhe1nCFWuwoknTFvS85fKMCRQUlQVFw7YM_Wz-ijlrG57sXohkhqfyTFUhwrkQbJXyPguEKWe9xG-JU45KrKLA7w1Tmeq7u6XEtPH4UVgJyzTXlbPhOBZL43jEbCCBVOv-Qv2ZJ8KAlnPKcEF1CwW27LQxzYM2qStCk2V-dmitnsFNiHKt5tq5jfbEKLhns9lvMgXKhYrr68XinOpqEBh3kdVLhm4e",
    online: false,
    unread: 2,
  },
];

const messageThreads = {
  1: [
    {
      id: 1,
      sender: "them",
      time: "10:42 AM",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_lHKgj3aAZ1-M1luOsuoWRG6D28wpNY6Ll1PkeWWagQU2mT61B5_cRryl1HnIuPkGGF15HcNTliFHDgRsBOtAvUF-5eQOF5eBOqnYJPqjoZw_2MUWHfBEt7EjCwPUyBgWPbGVrb95pRH0t3oObXM01uJ0bfUYY447qLuEeUCcAABk9Pi-3VYF3TfjHeAiQsurGVl4oY7qTkwZI40BUuvo_EX-_xhm9xLVOBue6wU1yySBibBYo1rQK2Rf-EjsB3XwbzLzI2CQGPVe",
      text: "Good morning, Admin. I'm reviewing the patient files for the surgery wing. The pathology reports for Room 402 are still pending. Has the lab processed the tissue samples yet?",
    },
    {
      id: 2,
      sender: "me",
      time: "10:44 AM",
      text: "Hello Dr. Vance. Let me check the system immediately. The lab was running a heavy load this morning due to the emergency intake.",
    },
    {
      id: 3,
      sender: "me",
      time: "10:45 AM",
      text: "Just confirmed. The status for Room 402 is 'In Progress'. Estimated completion is 11:30 AM. I've flagged it as high priority.",
    },
    {
      id: 4,
      sender: "them",
      time: "10:46 AM",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDBgGCFk1b4iw6j9rwKlBeYwlzlopBnuNwPseDE-iyYrk2_GR9RA8acEhE6POFuRH-aBBObwgQstjtzQg8kseqSap_WyB0wja0UYKjDLn8C_6_7rE0DG8bs8NprIA5Eqei2gHVgFac_FSHTQF7hU7Ol5wiw9kaCbVS7QqlUnbmTMyjk2JjY9B59EBumLnx9FKKFEKkT17lzYr8eI8p4lU6547GtneUWHuts__HYGAhkCBM7mF5lhFtaOk2FLLOR3ylYs4EX1z_kb7rj",
      text: "Excellent. We need those results before the 1:00 PM surgical consult. Thank you for the quick follow-up.",
    },
  ],
  2: [
    {
      id: 1,
      sender: "them",
      time: "09:33 AM",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
      text: "Hi Admin, can you confirm whether the MRI room is reserved for the 9:30 AM emergency case tomorrow?",
    },
    {
      id: 2,
      sender: "me",
      time: "09:35 AM",
      text: "I’m checking the radiology schedule now. I’ll send you the final slot confirmation shortly.",
    },
  ],
  3: [
    {
      id: 1,
      sender: "them",
      time: "Yesterday",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlmyduXohBsgrLlrVBlJouDAFGlu6OPr2-JbWcffD9A8bu2C0j9Ns0md3cZbezt9_nUsrofZgKhx33Pxb6z1VfKpSTn8UU83fmnxWFRcPp1KDBfo-AAFG3hmqsYm-7JsC069G49nFEG-u-ZAHFOXfxv7gyr63idgAdlHJRntA6kn5bAVSj7k6hl73QgMhVkyjbjAanp6sc6mCen0p-x2lAHYHa-GhAVYfq8irQRGPHPo9BTVJ06L3btFt2z7miK7ywfZjm5g15lAPr",
      text: "All surgical schedules for tomorrow have been updated and shared with the front desk.",
    },
  ],
  4: [
    {
      id: 1,
      sender: "them",
      time: "08:10 AM",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      text: "Two walk-in patients have been added to the afternoon queue. Please advise if we should reassign room usage.",
    },
  ],
};

const allowedRoles = ["doctor", "staff"];

export default function ManageMessages() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredConversations = useMemo(() => {
    const base = conversations.filter((item) =>
      allowedRoles.includes(item.type),
    );

    if (activeTab === "Doctors") {
      return base.filter((item) => item.type === "doctor");
    }

    if (activeTab === "Staff") {
      return base.filter((item) => item.type === "staff");
    }

    return base;
  }, [activeTab]);

  const [activeConversationId, setActiveConversationId] = useState(1);

  const activeConversation =
    filteredConversations.find((item) => item.id === activeConversationId) ||
    filteredConversations[0] ||
    null;

  const activeMessages = activeConversation
    ? messageThreads[activeConversation.id] || []
    : [];

  const isAllowedChat = activeConversation
    ? allowedRoles.includes(activeConversation.type)
    : false;

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-[#f7fafa] text-[#181c1d]">
      <div className="flex h-full overflow-hidden">
        <section className="flex h-full w-[380px] shrink-0 flex-col border-r border-slate-100 bg-[#f7fafa] xl:w-[400px]">
          <div className="shrink-0 border-b border-slate-100 bg-white/60 px-6 py-5">
            <div className="mb-4">
              <h1 className="text-2xl font-black tracking-tight text-[#006565]">
                Manage Messages
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Communicate with doctors and reception staff
              </p>
            </div>

            <div className="relative mb-4 flex items-center rounded-full bg-[#f1f4f4] px-4 py-2 ring-[#006565]/20 transition-all focus-within:ring-2">
              <span className="material-symbols-outlined text-xl text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search doctors or staff..."
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
                    No staff conversations available.
                  </p>
                </div>
              ) : (
                filteredConversations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveConversationId(item.id)}
                    className={[
                      "flex cursor-pointer gap-4 rounded-2xl p-4 transition-colors",
                      activeConversation?.id === item.id
                        ? "border-l-4 border-[#006565] bg-white shadow-sm"
                        : "hover:bg-white/70",
                    ].join(" ")}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      {item.online ? (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-start justify-between gap-3">
                        <h4 className="truncate text-sm font-bold">
                          {item.name}
                        </h4>
                        <span className="shrink-0 text-[10px] font-medium text-slate-400">
                          {item.time}
                        </span>
                      </div>

                      <p
                        className={[
                          "mb-1 text-[11px] font-bold uppercase tracking-wider",
                          item.type === "doctor"
                            ? "text-[#006565]"
                            : "text-purple-600",
                        ].join(" ")}
                      >
                        {item.role}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-xs font-medium text-slate-500">
                          {item.preview}
                        </p>

                        {item.unread > 0 ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#006565] text-[10px] font-black text-white">
                            {item.unread}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="flex h-full min-h-0 flex-1 flex-col bg-white">
          {activeConversation && isAllowedChat ? (
            <>
              <header className="shrink-0 border-b border-slate-50 bg-white/80 px-8 py-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={activeConversation.avatar}
                        alt={activeConversation.name}
                        className="h-11 w-11 rounded-full border-2 border-[#006565]/20 object-cover"
                      />
                      {activeConversation.online ? (
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="font-bold text-[#181c1d]">
                        {activeConversation.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight",
                            activeConversation.type === "doctor"
                              ? "bg-[#93f2f2] text-[#002020]"
                              : "bg-purple-100 text-purple-700",
                          ].join(" ")}
                        >
                          {activeConversation.type === "doctor"
                            ? "Doctor"
                            : "Reception Staff"}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {activeConversation.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-[#f1f4f4] hover:text-[#006565]">
                      <span className="material-symbols-outlined">
                        videocam
                      </span>
                    </button>
                    <button className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-[#f1f4f4] hover:text-[#006565]">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                    <button className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-[#f1f4f4] hover:text-[#006565]">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto bg-[#fcfdfd] p-8">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Today, Oct 24
                    </span>
                  </div>

                  {activeMessages.map((message) =>
                    message.sender === "them" ? (
                      <div
                        key={message.id}
                        className="flex max-w-[70%] items-end gap-3"
                      >
                        <img
                          src={message.avatar}
                          alt="Avatar"
                          className="mb-1 h-8 w-8 rounded-full object-cover"
                        />
                        <div>
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
                        className="ml-auto flex max-w-[70%] flex-col items-end gap-1"
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

              <div className="shrink-0 border-t border-slate-50 bg-white p-6">
                <div className="group flex items-center gap-4 rounded-2xl bg-[#ebeeee] px-4 py-3 shadow-inner">
                  <button className="p-1 text-slate-400 transition-colors hover:text-[#006565]">
                    <span className="material-symbols-outlined">
                      attach_file
                    </span>
                  </button>
                  <button className="p-1 text-slate-400 transition-colors hover:text-[#006565]">
                    <span className="material-symbols-outlined">
                      sentiment_satisfied
                    </span>
                  </button>

                  <input
                    type="text"
                    placeholder={`Message ${activeConversation.type === "doctor" ? "doctor" : "reception staff"}...`}
                    className="flex-1 border-none bg-transparent text-sm font-medium text-[#181c1d] outline-none focus:ring-0"
                  />

                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006565] text-white shadow-lg shadow-[#006565]/20 transition-all hover:scale-105">
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
            <div className="flex flex-1 items-center justify-center bg-[#fcfdfd]">
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                  <span className="material-symbols-outlined text-red-500">
                    block
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Messaging restricted
                </h3>
                <p className="mt-2 max-w-sm text-sm font-medium text-slate-500">
                  Admin can only message doctors and reception staff.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
