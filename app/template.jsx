'use client';

import { ViewTransition } from 'react';

// A template remounts on every navigation, so this <ViewTransition> is the
// outermost thing inserted/removed when the route changes. React only runs
// enter/exit animations in that position, which is why it lives here and not
// inside SiteLayout. Animations are defined in globals.css (.page-in / .page-out).
export default function Template({ children }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
