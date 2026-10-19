"use client";

import React, { useState, useRef, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const SUGGESTED_PROMPTS = [
  "What is Git Visualizer and how does it work?",
  "Show me projects built with Next.js or React",
  "What are Dipesh's technical skills & tools?",
  "Where can I find live project demos and GitHub repos?",
  "Tell me about his video editing & motion graphics experience",
  "How can I contact or hire Dipesh?"
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm the AI assistant for **Dipesh Sapkota's** portfolio. 

Ask me anything about his software engineering projects, computer engineering background at **IOE Thapathali Campus**, video editing and motion graphics, or how to get in touch!`,
      tools: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, activeTool]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isStreaming) return;

    setInput('');
    const newMessages = [
      ...messages,
      { role: 'user', content: messageContent }
    ];
    setMessages(newMessages);
    setIsStreaming(true);
    setActiveTool(null);

    // Placeholder for assistant stream
    const assistantIndex = newMessages.length;
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: '', tools: [] }
    ]);

    try {
      abortControllerRef.current = new AbortController();

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
        signal: abortControllerRef.current.signal
      });

      if (!res.ok) {
        let errMessage = 'Failed to connect to assistant';
        try {
          const errData = await res.json();
          errMessage = errData.error || errMessage;
        } catch {}
        setMessages(prev => {
          const updated = [...prev];
          updated[assistantIndex] = {
            role: 'assistant',
            content: `⚠️ **Error**: ${errMessage}. Please try again shortly.`,
            tools: []
          };
          return updated;
        });
        setIsStreaming(false);
        setActiveTool(null);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith('event: ')) {
            const eventType = line.replace('event: ', '').trim();
            const nextLine = lines[i + 1]?.trim() || '';

            if (nextLine.startsWith('data: ')) {
              i++;
              try {
                const data = JSON.parse(nextLine.replace('data: ', ''));

                if (eventType === 'tool_call') {
                  setActiveTool(data.label || `Calling ${data.name}...`);
                  setMessages(prev => {
                    const updated = [...prev];
                    const currentTools = updated[assistantIndex]?.tools || [];
                    updated[assistantIndex] = {
                      ...updated[assistantIndex],
                      tools: [...currentTools, { name: data.name, label: data.label }]
                    };
                    return updated;
                  });
                } else if (eventType === 'tool_result') {
                  // Tool finished
                  setActiveTool(null);
                } else if (eventType === 'delta') {
                  setMessages(prev => {
                    const updated = [...prev];
                    const current = updated[assistantIndex]?.content || '';
                    updated[assistantIndex] = {
                      ...updated[assistantIndex],
                      content: current + (data.text || '')
                    };
                    return updated;
                  });
                } else if (eventType === 'done') {
                  setIsStreaming(false);
                  setActiveTool(null);
                } else if (eventType === 'error') {
                  setMessages(prev => {
                    const updated = [...prev];
                    const current = updated[assistantIndex]?.content || '';
                    updated[assistantIndex] = {
                      ...updated[assistantIndex],
                      content: current + `\n\n*(Error: ${data.message || 'Generation failed'})*`
                    };
                    return updated;
                  });
                }
              } catch (err) {
                console.error('SSE JSON parse error:', err);
              }
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => {
          const updated = [...prev];
          updated[assistantIndex] = {
            role: 'assistant',
            content: updated[assistantIndex]?.content 
              ? updated[assistantIndex].content + `\n\n*(Connection interrupted)*`
              : `⚠️ **Connection error**: Could not reach assistant server.`,
            tools: []
          };
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
      setActiveTool(null);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
    setActiveTool(null);
  };

  const handleClear = () => {
    if (isStreaming) handleStop();
    setMessages([
      {
        role: 'assistant',
        content: `Conversation reset. How can I assist you with Dipesh's projects, technical work, or background?`,
        tools: []
      }
    ]);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI Assistant" : "Open Dipesh's Portfolio AI Assistant"}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 border border-emerald-500/40 text-white shadow-2xl hover:border-emerald-400 hover:shadow-emerald-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          {/* Animated pulsing emerald ring */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>

          <svg className="w-5 h-5 text-emerald-400 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>

          <span className="font-semibold text-xs sm:text-sm tracking-tight text-slate-100">
            {isOpen ? 'Close Assistant' : 'Ask Portfolio AI'}
          </span>
        </button>
      </div>

      {/* 2. CHAT DRAWER / PANEL */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[460px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl bg-[#090D16]/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl overflow-hidden animate-fade-in font-sans">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#070A0F]/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                DS
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Dipesh Portfolio AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Grounded in verified portfolio & code</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleClear}
                title="Clear conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs"
              >
                ↻ Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* User Message */}
                {m.role === 'user' ? (
                  <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-none bg-emerald-500 text-slate-950 font-medium text-xs shadow-md">
                    {m.content}
                  </div>
                ) : (
                  /* Assistant Message */
                  <div className="max-w-[95%] w-full bg-[#0E131F] border border-slate-800/90 rounded-2xl rounded-tl-none p-3.5 space-y-2 shadow-sm text-slate-200">
                    
                    {/* Tool Badges executed for this message */}
                    {m.tools && m.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pb-1 border-b border-slate-800/60 mb-2">
                        {m.tools.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 text-emerald-400 text-[10px] font-mono border border-emerald-500/20"
                          >
                            <span className="text-[9px]">⚡</span>
                            <span>{t.label || t.name}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <MarkdownRenderer content={m.content} />

                    {/* Copy Button */}
                    {m.content && (
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(m.content, idx)}
                          className="text-[10px] font-mono text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <span className="text-emerald-400">✓</span>
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <span>📋</span>
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Live Tool Execution Status */}
            {activeTool && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono animate-pulse w-fit">
                <span className="animate-spin text-xs">⚙</span>
                <span>{activeTool}</span>
              </div>
            )}

            {/* Blinking cursor while streaming without tool */}
            {isStreaming && !activeTool && (
              <div className="text-emerald-400 font-mono text-xs animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-3 bg-emerald-400 inline-block" />
                <span className="text-[10px] text-slate-400">Generating response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts (when only 1 or 2 messages exist) */}
          {messages.length <= 2 && !isStreaming && (
            <div className="px-4 py-2 border-t border-slate-800/60 bg-[#070A0F]/60">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                Suggested exploration:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-emerald-300 text-[11px] text-left transition-colors truncate max-w-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Form */}
          <div className="p-3 border-t border-slate-800 bg-[#070A0F]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Dipesh's projects, skills, education..."
                disabled={isStreaming}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>⏹</span>
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors shrink-0"
                >
                  Send
                </button>
              )}
            </form>
            <div className="text-[10px] text-center text-slate-500 mt-1.5">
              Grounded in verified portfolio data & GitHub public repositories.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

