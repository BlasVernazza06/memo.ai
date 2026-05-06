'use client';

import { Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function QuizOption({
  option,
  index,
  handleOptionSelect,
  isAnswered,
  isSelected,
  showResult,
  isCorrect,
  shake,
  cardClass,
}: {
  option: string | undefined;
  index: number;
  handleOptionSelect: (index: number) => void;
  isAnswered: boolean;
  isSelected: boolean;
  showResult: boolean;
  isCorrect: boolean;
  shake: boolean;
  cardClass: string;
}) {
  return (
    <motion.button
      key={index}
      whileTap={!isAnswered ? { scale: 0.98 } : {}}
      animate={
        showResult && isCorrect
          ? { scale: [1, 1.05, 1], transition: { duration: 0.4 } }
          : showResult && isSelected && !isCorrect && shake
            ? {
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.4 },
              }
            : {}
      }
      onClick={() => handleOptionSelect(index)}
      disabled={isAnswered}
      className={`w-full p-5 rounded-2xl text-left font-bold transition-all duration-200 flex items-center justify-between group ${cardClass}`}
    >
      <span className="text-lg">{option}</span>
      <AnimatePresence>
        {showResult && isCorrect && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-emerald-100 p-1 rounded-full"
          >
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          </motion.div>
        )}
        {showResult && isSelected && !isCorrect && (
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-red-100 p-1 rounded-full"
          >
            <X className="w-5 h-5 text-red-500 shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
      {!showResult && isSelected && (
        <div className="w-4 h-4 rounded-full bg-primary shrink-0" />
      )}
      {!showResult && !isSelected && (
        <div className="w-4 h-4 rounded-full border-2 border-border group-hover:border-primary/50 shrink-0" />
      )}
    </motion.button>
  );
}
