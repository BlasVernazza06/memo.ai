import { motion } from 'motion/react';

export default function AchievementTooltip({
  title,
  description,
  current,
  target,
  unlocked,
  gradient,
}: {
  title: string;
  description: string;
  current: number;
  target: number;
  unlocked: boolean;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
      animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute bottom-[115%] left-1/2 z-200 w-60 p-4 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl pointer-events-none"
    >
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs font-black text-white tracking-tight">
            {title}
          </h4>
          <span
            className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-linear-to-r ${gradient} text-white`}
          >
            {unlocked ? 'Desbloqueado' : 'Bloqueado'}
          </span>
        </div>
        <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">
          {description}
        </p>
        <div className="pt-2 border-t border-neutral-800 flex flex-col gap-1">
          <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">
            Objetivo
          </p>
          <p className="text-[10px] text-neutral-300 font-medium">
            Debes completar {target} {target === 1 ? 'vez' : 'veces'}:{' '}
            <span className="font-extrabold text-white">
              {current}/{target}
            </span>
          </p>
        </div>
      </div>
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-950/95" />
    </motion.div>
  );
}
