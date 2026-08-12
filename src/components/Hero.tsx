import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mt-12 mb-16 px-4 z-10 relative">
      <motion.h1 
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-6xl md:text-8xl text-sun-yellow mb-6 drop-shadow-[0_0_30px_rgba(255,210,28,0.5)]"
      >
        Vibe Check
      </motion.h1>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="font-sans text-xl md:text-2xl text-cream font-medium max-w-xl leading-relaxed"
      >
        Generate your official Hacker House Goa 2026 Identity Card.
      </motion.h2>
    </div>
  );
};
