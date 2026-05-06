import Link from 'next/link';

import { ChevronLeft, Pause, Play, Timer } from 'lucide-react';

import { formatTime } from '@/hooks/formats/use-formate-time';

interface QuizHeaderProps {
  workspaceId: string;
  timer: number;
  timeState: 'running' | 'paused';
  onToggleTimer: () => void;
}

export default function QuizHeader({
  workspaceId,
  timer,
  timeState,
  onToggleTimer,
}: QuizHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/dashboard/workspaces/${workspaceId}`}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider transition-colors group"
      >
        <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span>Salir</span>
      </Link>
      <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-wider">
        <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-wider bg-muted px-3 py-1 rounded-full border border-border">
          <Timer className="w-4 h-4" />
          <span>Tiempo: {formatTime(timer)}</span>
        </div>
        <button
          onClick={onToggleTimer}
          className="rounded-full border border-border p-1 cursor-pointer hover:bg-muted transition-colors"
        >
          {timeState === 'running' ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
