import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Check } from 'lucide-react';

interface ScoreSectionProps {
  score: number;
}

export const ScoreSection: React.FC<ScoreSectionProps> = ({ score }) => {
  const [copied, setCopied] = useState(false);

  const getPlantStatus = () => {
    if (score < 40) return { emoji: '🥀', text: 'Needs some love!', color: 'text-rose-500' };
    if (score < 70) return { emoji: '🌿', text: 'Growing strong!', color: 'text-emerald-500' };
    return { emoji: '🌳', text: 'Thriving!', color: 'text-emerald-600' };
  };

  const plant = getPlantStatus();

  const handleShare = async () => {
    const text = `I just scored an ${score} on my EcoImpact daily check! 🌱🌍 Can you beat my score?`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative flex h-64 w-64 flex-col items-center justify-center rounded-full bg-white shadow-xl dark:bg-slate-800"
      >
        <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-700" />
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100 dark:text-slate-700"
          />
          <motion.circle
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: `${(score / 100) * 754} 1000` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className={`${
              score < 40 ? 'text-rose-500' : score < 70 ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          />
        </svg>
        
        <div className="flex flex-col items-center z-10">
          <motion.div
            key={plant.emoji}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl mb-2"
          >
            {plant.emoji}
          </motion.div>
          <div className="text-5xl font-black text-slate-800 dark:text-white">
            {score}
          </div>
          <div className={`text-sm font-bold uppercase tracking-wider ${plant.color}`}>
            {plant.text}
          </div>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="flex items-center gap-2 rounded-full bg-slate-800 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-700"
      >
        {copied ? <Check size={18} /> : <Share2 size={18} />}
        {copied ? 'Copied!' : 'Share My Vibe'}
      </motion.button>
    </div>
  );
};
