import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface TabButtonProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl p-3 transition-all duration-200 ${
        isActive
          ? 'bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-900/30 dark:text-emerald-400'
          : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-xs font-medium">{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 h-1 w-8 rounded-t-full bg-emerald-500"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};
