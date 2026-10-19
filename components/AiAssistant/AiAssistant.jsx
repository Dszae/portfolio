"use client";

import React, { useState, useRef, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const SUGGESTED_PROMPTS = [
  "What is Git Visualizer and how does it work?",
  "Show me projects built with Next.js or React",
  "What are Dipesh's technical skills & tools?",
  "Tell me about his video editing & motion graphics work",
  "Where can I find live project demos and GitHub repos?",
  "How can I contact Dipesh?"
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello. I am the portfolio assistant for **Dipesh Sapkota**.

You can ask about his software projects, computer engineering background at **IOE Thapathali Campus**, video editing and motion graphics, or how to get in touch.`,
      tools: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const chatboxRef = useRef(null);
  const launcherButtonRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, activeTool]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        chatboxRef.current && 
        !chatboxRef.current.contains(event.target) &&
        launcherButtonRef.current && 
        !launcherButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
        let errMessage = 'Unable to complete request';
        try {
          const errData = await res.json();
          errMessage = errData.error || errMessage;
        } catch {}
        setMessages(prev => {
          const updated = [...prev];
          updated[assistantIndex] = {
            role: 'assistant',
            content: `**Error**: ${errMessage}. Please try again shortly.`,
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
                  setActiveTool(data.label || `Querying ${data.name}...`);
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
                  setMessages(prev => {
                    const updated = [...prev];
                    if (updated[assistantIndex]) {
                      updated[assistantIndex] = {
                        ...updated[assistantIndex],
                        engine: data.engine || 'google_gemini_flash',
                        model: data.model || 'gemini-3.8-flash'
                      };
                    }
                    return updated;
                  });
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
                console.error('SSE parse error:', err);
              }
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => {
          const updated = [...prev];
          const current = updated[assistantIndex]?.content || '';
          updated[assistantIndex] = {
            role: 'assistant',
            content: current ? current + '\n\n*(Connection interrupted)*' : 'Connection interrupted. Please try again.',
            tools: updated[assistantIndex]?.tools || []
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

  return (
    <>
      
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          ref={launcherButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
          className="group relative flex items-center justify-center sm:gap-2.5 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full bg-white/95 dark:bg-[#0F1216]/95 border border-slate-200/90 dark:border-[#222933] text-slate-800 dark:text-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-[#065F46]/60 dark:hover:border-[#34D399]/40 hover:shadow-lg transition-all duration-200 active:scale-[0.95]"
        >
          
          <span className="hidden sm:inline-flex relative h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#065F46] dark:bg-[#34D399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#065F46] dark:bg-[#34D399]"></span>
          </span>

<svg
            className="w-5 h-5 sm:w-4 sm:h-4 text-[#065F46] dark:text-[#34D399] transition-transform duration-200 group-hover:scale-105"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            )}
          </svg>

          <span className="hidden sm:inline font-medium text-xs tracking-tight text-slate-800 dark:text-slate-200">
            {isOpen ? 'Close' : 'Ask Assistant'}
          </span>
        </button>
      </div>

{isOpen && (
        <>
          
          <div
            className="fixed inset-0 z-[70] bg-black/30 sm:bg-black/15 backdrop-blur-[1px] sm:backdrop-blur-none cursor-pointer transition-opacity"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          <div 
            ref={chatboxRef}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-20 sm:right-6 z-[75] w-auto sm:w-[440px] h-[calc(100dvh-5.5rem)] sm:h-[580px] max-h-[640px] flex flex-col rounded-2xl bg-white/98 dark:bg-[#0F1216]/98 backdrop-blur-xl border border-slate-200/90 dark:border-[#222933] shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden font-sans text-slate-900 dark:text-slate-100"
          >

<div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-[#222933] bg-slate-50/80 dark:bg-[#090B0E]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#065F46]/10 dark:bg-[#065F46]/30 border border-[#065F46]/20 dark:border-[#065F46]/40 flex items-center justify-center text-[#065F46] dark:text-[#34D399] font-semibold text-xs tracking-tight">
                DS
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span>Dipesh Portfolio Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] dark:bg-[#34D399]" />
                </h3>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Verified portfolio knowledge & work</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-[#181D24] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                aria-label="Close assistant"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-[#181D24] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

<div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>

{m.role === 'user' ? (
                  <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-sm bg-[#065F46] dark:bg-[#065F46] text-white font-medium text-xs shadow-sm">
                    {m.content}
                  </div>
                ) : (
                  
                  <div className="max-w-[95%] w-full bg-slate-100/90 dark:bg-[#14181F] border border-slate-200/90 dark:border-[#222933] rounded-2xl rounded-tl-sm p-3.5 space-y-2 text-slate-950 dark:text-slate-100 shadow-sm">

{m.tools && m.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pb-1 border-b border-slate-200/80 dark:border-slate-800/60 mb-2">
                        {m.tools.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white dark:bg-[#090B0E] text-slate-800 dark:text-slate-200 text-[10px] font-mono border border-slate-300 dark:border-slate-800 font-medium"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#065F46] dark:bg-[#34D399]" />
                            <span>{t.label || t.name}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <MarkdownRenderer content={m.content} />

{m.content && (
                      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 font-mono tracking-tight font-medium">
                        <span>
                          {m.engine === 'grounded_portfolio_engine'
                            ? 'Portfolio Knowledge Base'
                            : 'Portfolio RAG • Grounded LLM'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

{activeTool && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#14181F] border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-[11px] font-mono w-fit font-medium">
                <svg className="w-3 h-3 animate-spin text-[#065F46] dark:text-[#34D399]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{activeTool}</span>
              </div>
            )}

{isStreaming && !activeTool && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#14181F] text-slate-700 dark:text-slate-300 text-[11px] w-fit font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] dark:bg-[#34D399] animate-pulse" />
                <span className="text-[10px] font-mono">Generating response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

{messages.length <= 2 && !isStreaming && (
            <div className="px-4 py-2.5 border-t border-slate-200/80 dark:border-[#222933] bg-slate-50/60 dark:bg-[#090B0E]/60">
              <span className="text-[10px] font-mono text-slate-700 dark:text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
                Suggested exploration
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-md bg-white dark:bg-[#14181F] hover:bg-slate-100 dark:hover:bg-[#181D24] border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/40 text-[11px] text-left transition-colors truncate max-w-full font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

<div className="p-3 border-t border-slate-200/80 dark:border-[#222933] bg-slate-50/80 dark:bg-[#090B0E]/80">
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
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#14181F] border border-slate-300 dark:border-[#222933] text-slate-950 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#065F46]/20 dark:focus:ring-[#34D399]/20 focus:border-[#065F46] dark:focus:border-[#34D399] transition-all font-medium"
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-sm bg-slate-800 dark:bg-slate-300" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="p-2.5 rounded-xl bg-[#065F46] hover:bg-[#044E39] disabled:opacity-40 disabled:hover:bg-[#065F46] text-white transition-colors shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </form>
            <div className="text-[10px] text-center text-slate-600 dark:text-slate-400 mt-1.5 font-mono font-medium">
              Verified Portfolio RAG • Grounded LLM Reasoning
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
