import React from 'react';
import { motion } from 'motion/react';

type SuggestionData = {
  text: string;
  icon: React.ReactNode;
  title: string;
};

interface SuggestionCardProps {
  idx: number;
  suggestion: SuggestionData;
  onClick: (text: string) => void;
}

export default function SuggestionCard({
  idx,
  suggestion,
  onClick,
}: SuggestionCardProps) {
  return (
    <motion.button
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * idx }}
      onClick={() => onClick(suggestion.text)}
      className="p-5 rounded-3xl bg-card border border-border/40 hover:border-primary/40 text-left transition-all group hover:bg-muted/50 hover:scale-[1.02] active:scale-95 flex flex-col gap-3 shadow-sm"
    >
      <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
        {suggestion.icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
          {suggestion.title}
        </p>
        <p className="text-[11px] text-muted-foreground font-bold mt-1.5 leading-relaxed opacity-80">
          {suggestion.text}
        </p>
      </div>
    </motion.button>
  );
}
