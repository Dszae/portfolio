"use client";

import React from 'react';
import Link from 'next/link';

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-emerald-300 overflow-x-auto leading-relaxed"
          >
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

if (line.trim() === '---' || line.trim() === '***') {
      elements.push(
        <hr key={`hr-${i}`} className="my-3 border-slate-200 dark:border-slate-800" />
      );
      continue;
    }

if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="font-bold text-sm text-slate-950 dark:text-slate-100 mt-3 mb-1 tracking-tight">
          {renderFormattedText(line.replace('### ', ''))}
        </h4>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="font-bold text-base text-slate-950 dark:text-slate-100 mt-3.5 mb-1.5 tracking-tight">
          {renderFormattedText(line.replace('## ', ''))}
        </h3>
      );
      continue;
    }

if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <li key={`li-${i}`} className="ml-4 list-disc text-slate-900 dark:text-slate-200 my-0.5 leading-relaxed font-normal">
          {renderFormattedText(itemText)}
        </li>
      );
      continue;
    }

if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} className="h-1.5" />);
      continue;
    }

elements.push(
      <p key={`p-${i}`} className="my-1 text-slate-900 dark:text-slate-200 leading-relaxed text-xs sm:text-[13px] font-normal">
        {renderFormattedText(line)}
      </p>
    );
  }

  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <pre
        key="code-dangling"
        className="my-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-[11px] font-mono text-slate-900 dark:text-emerald-300 overflow-x-auto"
      >
        <code>{codeBuffer.join('\n')}</code>
      </pre>
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

function renderFormattedText(text) {
  if (!text) return '';

  const parts = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderInlineStyles(text.substring(lastIndex, match.index), `sub-${lastIndex}`));
    }
    const label = match[1];
    const href = match[2];
    const isInternal = href.startsWith('/') || href.includes('dipeshsapkota7.com.np');

    if (isInternal) {
      const cleanPath = href.replace('https://www.dipeshsapkota7.com.np', '').replace('http://localhost:3000', '') || '/';
      parts.push(
        <Link
          key={`lnk-${match.index}`}
          href={cleanPath}
          className="text-[#065F46] dark:text-[#34D399] hover:text-[#044E39] dark:hover:text-[#6EE7B7] font-medium underline underline-offset-2 decoration-[#065F46]/40 hover:decoration-[#065F46] dark:decoration-[#34D399]/40 dark:hover:decoration-[#34D399] transition-colors inline-flex items-center gap-0.5"
        >
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`ext-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#065F46] dark:text-[#34D399] hover:text-[#044E39] dark:hover:text-[#6EE7B7] font-medium underline underline-offset-2 decoration-[#065F46]/40 hover:decoration-[#065F46] dark:decoration-[#34D399]/40 dark:hover:decoration-[#34D399] transition-colors inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <svg className="w-3 h-3 opacity-60 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(renderInlineStyles(text.substring(lastIndex), `tail-${lastIndex}`));
  }

  return parts;
}

function renderInlineStyles(str, baseKey) {
  const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((tok, idx) => {
    if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2) {
      return (
        <code
          key={`${baseKey}-${idx}`}
          className="px-1.5 py-0.5 rounded bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-[#065F46] dark:text-[#34D399] font-mono text-[11px] font-semibold"
        >
          {tok.slice(1, -1)}
        </code>
      );
    }
    if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
      return (
        <strong key={`${baseKey}-${idx}`} className="font-bold text-slate-950 dark:text-white">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) {
      return (
        <em key={`${baseKey}-${idx}`} className="italic text-slate-800 dark:text-slate-200">
          {tok.slice(1, -1)}
        </em>
      );
    }
    return tok;
  });
}
