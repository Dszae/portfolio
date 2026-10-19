"use client";

import React from 'react';
import Link from 'next/link';

/**
 * Lightweight, safe markdown renderer tailored for chat messages.
 * Handles headers, bold, italics, code blocks, bullet lists, and links.
 */
export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Split lines
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="my-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
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

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={`hr-${i}`} className="my-3 border-slate-800 dark:border-slate-800" />);
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="font-bold text-sm text-white mt-3 mb-1">
          {renderFormattedText(line.replace('### ', ''))}
        </h4>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="font-bold text-base text-white mt-3.5 mb-1.5">
          {renderFormattedText(line.replace('## ', ''))}
        </h3>
      );
      continue;
    }

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <li key={`li-${i}`} className="ml-4 list-disc text-slate-300 my-0.5 leading-relaxed">
          {renderFormattedText(itemText)}
        </li>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} className="h-1.5" />);
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${i}`} className="my-1 text-slate-200 leading-relaxed text-xs sm:text-[13px]">
        {renderFormattedText(line)}
      </p>
    );
  }

  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <pre key="code-dangling" className="my-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
        <code>{codeBuffer.join('\n')}</code>
      </pre>
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

/**
 * Parses inline formatting: [link](url), **bold**, *italic*, `code`
 */
function renderFormattedText(text) {
  if (!text) return '';

  // Match markdown links [text](url)
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
          className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
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
          className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <span className="text-[10px] opacity-75">↗</span>
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
  // Replace inline `code`, **bold**, *italic*
  const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((tok, idx) => {
    if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2) {
      return (
        <code key={`${baseKey}-${idx}`} className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-[11px]">
          {tok.slice(1, -1)}
        </code>
      );
    }
    if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
      return (
        <strong key={`${baseKey}-${idx}`} className="font-bold text-white">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) {
      return (
        <em key={`${baseKey}-${idx}`} className="italic text-slate-300">
          {tok.slice(1, -1)}
        </em>
      );
    }
    return tok;
  });
}

