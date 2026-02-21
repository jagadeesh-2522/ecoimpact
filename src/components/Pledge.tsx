import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle } from 'lucide-react';

interface PledgeProps {
  onPledge: () => void;
  taken: boolean;
}

export const Pledge: React.FC<PledgeProps> = ({ onPledge, taken }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg dark:from-emerald-600 dark:to-teal-700"
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-bold">Daily Pledge 🌟</h3>
          <p className="text-emerald-50 opacity-90">
            "I pledge to use a reusable bottle today."
          </p>
        </div>

        <button
          onClick={!taken ? onPledge : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group flex h-12 w-12 items-center justify-center rounded-full transition-all ${
            taken
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
          disabled={taken}
        >
          <AnimatePresence mode="wait">
            {taken ? (
              <motion.div
                key="checked"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <CheckCircle2 size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="unchecked"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Circle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Decorative background elements */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
    </motion.div>
  );
};
