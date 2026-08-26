'use client';

import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -7 }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1], // Highly responsive, subtle ease-out curve
      }}
      className="w-full flex-1 flex flex-col will-change-[transform,opacity]"
    >
      {children}
    </motion.div>
  );
}
