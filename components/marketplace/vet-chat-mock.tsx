"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  from: "vet" | "me";
  text: string;
  time: string;
}

const seed: Message[] = [
  { id: "m1", from: "vet", text: "Hello! I'm online now — what's going on with your pet today?", time: "11:02 PM" },
  { id: "m2", from: "me", text: "My cat hasn't eaten since this morning and seems lethargic.", time: "11:03 PM" },
  { id: "m3", from: "vet", text: "Understood. Any vomiting, diarrhea, or fever that you've noticed? And how old is she?", time: "11:04 PM" },
];

export function VetChatMock({ vetName }: { vetName: string }) {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [draft, setDraft] = useState("");

  function send() {
    if (!draft.trim()) return;
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        from: "me",
        text: draft.trim(),
        time: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border bg-ink px-5 py-4 text-ivory">
        <p className="font-display text-base">{vetName}</p>
        <p className="text-xs text-gold">● Online now</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                m.from === "me"
                  ? "bg-emerald text-ivory"
                  : "bg-secondary text-ink"
              )}
            >
              <p>{m.text}</p>
              <p
                className={cn(
                  "mt-1 text-[10px]",
                  m.from === "me" ? "text-ivory/60" : "text-ink/40"
                )}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-border p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Describe what's going on..."
          className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-emerald"
        />
        <button
          onClick={send}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald text-ivory transition-colors hover:bg-emerald-deep"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
