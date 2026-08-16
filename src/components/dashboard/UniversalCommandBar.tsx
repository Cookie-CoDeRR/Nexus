"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  AlertTriangle,
  Users,
  Sparkles,
  Search,
  X,
  ArrowRight,
  Send,
  Loader2,
  Bot,
  Command,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  Settings,
  User,
} from "lucide-react";
import { askNexusAssistant, AskNexusResponse } from "@/app/actions/ask-nexus-ai";

interface MessageItem {
  id: string;
  sender: "user" | "ai";
  text: string;
  suggestedAction?: {
    label: string;
    route: string;
  };
}

export function UniversalCommandBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 **Hello! I am NEXUS AI, your platform co-pilot.** Ask me anything about your marketing telemetry, AI studio copywriting, anomaly alerts, or Slate CRM webhooks.",
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || query;
    if (!messageText.trim() || isPending) return;

    const userMessage: MessageItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    startTransition(async () => {
      try {
        const response: AskNexusResponse = await askNexusAssistant({
          query: messageText.trim(),
        });

        const aiMessage: MessageItem = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: response.answer,
          suggestedAction: response.suggestedAction,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err: unknown) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: "ai",
            text: "I encountered a transient latency error. Please try asking again.",
          },
        ]);
      }
    });
  };

  const navItems = [
    { name: "Telemetry", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Studio", href: "/studio", icon: Megaphone },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
    { name: "Leads CRM", href: "/leads", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const suggestedPrompts = [
    "How do I test the Slate CRM webhook?",
    "Explain how the Anomaly Sentinel works",
    "How do I generate an MBA ad campaign in Studio?",
    "Show me the current spend breakdown",
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING AI CO-PILOT CHAT CARD (Anchored directly above bottom dock)     */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          ref={drawerRef}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92vw] sm:w-[640px] h-[540px] max-h-[75vh] rounded-3xl backdrop-blur-md bg-[#0A0F1C]/95 border border-white/15 flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden animate-in slide-in-from-bottom-6 zoom-in-95 duration-200 text-white"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">NEXUS AI Co-Pilot</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Gemini 1.5
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Higher-ed marketing telemetry & system intelligence.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Minimize Co-Pilot (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="h-7 w-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 max-w-[88%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white/[0.04] border border-white/10 text-gray-200 rounded-bl-none shadow-md"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Suggested Navigation Route Action */}
                  {msg.suggestedAction && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          router.push(msg.suggestedAction!.route);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-white text-[11px] font-bold transition-all shadow-md active:scale-95"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isPending && (
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <div className="h-7 w-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="font-mono text-[11px]">NEXUS AI is synthesizing guidance...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 sm:px-5 py-2 border-t border-white/5 bg-white/[0.01]">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                Suggested Questions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.map((promptText, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(promptText)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 transition-all text-left"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 border-t border-white/10 bg-[#070b14]/90 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about telemetry, studio copywriting, alerts, or Slate CRM..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />

            <button
              type="submit"
              disabled={!query.trim() || isPending}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-all active:scale-95 shadow-md shadow-blue-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING BOTTOM DOCK                                                   */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
        <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 rounded-full bg-[#0A0F1C]/90 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-white transition-all hover:border-white/25">
          {/* Quick Page Switcher Icons */}
          <div className="flex items-center gap-1 sm:gap-1.5 pr-2 sm:pr-4 border-r border-white/10">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 rounded-full transition-all relative group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  title={item.name}
                >
                  <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />

                  {/* Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#111827] border border-white/10 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* "Ask NEXUS AI" Trigger Bar */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full border text-xs transition-all group ${
              isOpen
                ? "bg-blue-600/20 border-blue-500/50 text-white shadow-md shadow-blue-600/20"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="hidden md:inline text-[11px] font-medium text-gray-300">
              {isOpen ? "Co-Pilot Active (Esc to close)" : "Ask AI assistant or type a command..."}
            </span>
            <span className="md:hidden text-[11px] font-medium text-gray-300">
              {isOpen ? "Co-Pilot Active" : "Ask AI..."}
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gray-400 group-hover:text-white">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </>
  );
}
