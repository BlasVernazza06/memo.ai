import { useState } from 'react';

import { Smile, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function IconSelector({
  onSelect,
  currentIcon,
}: {
  onSelect: (icon: string) => void;
  currentIcon: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const EMOJIS = [
    '📚',
    '📓',
    '📝',
    '🧠',
    '🎓',
    '🔬',
    '💡',
    '✨',
    '🎨',
    '🚀',
    '💻',
    '📊',
    '📉',
    '🛠️',
    '📁',
    '📍',
    '🏷️',
    '🌟',
    '⚡',
    '🎯',
    '🔥',
    '🌍',
    '🛠️',
    '⚖️',
    '🧬',
    '🔭',
    '🌍',
    '🏺',
    '🎭',
    '🎼',
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 w-12 flex items-center justify-center rounded-xl border-2 transition-all active:scale-95 shadow-sm ${
          isOpen
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
      >
        <span className="text-2xl">
          <Smile className="text-slate-400 w-6 h-6" />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute left-0 top-full mt-3 z-50 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 w-72 origin-top-left"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Seleccionar Icono
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-6 gap-1">
                {EMOJIS.map((emoji, index) => (
                  <button
                    key={`${emoji}-${index}`}
                    type="button"
                    onClick={() => {
                      onSelect(emoji);
                      setIsOpen(false);
                    }}
                    className={`w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all hover:bg-slate-50 hover:scale-110 active:scale-90 ${
                      currentIcon === emoji
                        ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-inner'
                        : 'text-slate-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
