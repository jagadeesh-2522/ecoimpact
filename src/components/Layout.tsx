import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  username: string;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, username, onLogout }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
              <span className="text-lg">🌱</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
              EcoImpact
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-600 sm:inline-block dark:text-slate-400">
              Hi, {username} 👋
            </span>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle Eco-Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={onLogout}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md p-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 sm:hidden">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Hi, {username} 👋
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Ready to make an impact today?
            </p>
          </div>
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/80 py-4 text-center backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Built by students who believe small actions matter. 🌍
        </p>
      </footer>
    </div>
  );
};
