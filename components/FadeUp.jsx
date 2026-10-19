"use client";
import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';

const emptySubscribe = () => () => {};

export default function FadeUp({ children }) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isClient) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}