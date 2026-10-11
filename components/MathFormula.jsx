import React from 'react';
import katex from 'katex';

export default function MathFormula({ math, block = false, className = '' }) {
  let html = '';
  try {
    html = katex.renderToString(math, {
      displayMode: block,
      throwOnError: false,
    });
    html = html.replace(/<svg\b(?![^>]*\baria-hidden=)/g, '<svg aria-hidden="true" focusable="false" ');
  } catch (err) {
    html = `<span>${math}</span>`;
  }

  const Component = block ? 'div' : 'span';

  return (
    <Component
      className={`katex-math-render ${block ? 'my-2 overflow-x-auto overflow-y-hidden py-1' : 'inline-block align-middle'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

