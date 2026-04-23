'use client';

import { X } from 'lucide-react';
import { motion } from 'motion/react';

import { formatFileSize } from '@/hooks/use-file-size';
import { LocalFile } from '@/hooks/use-file-upload';
import { getFileIcon } from '@/hooks/use-get-icon';

interface AttachmentCardProps {
  file: LocalFile;
  onRemove?: (id: string) => void;
}

export default function AttachmentCard({
  file,
  onRemove,
}: AttachmentCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 5 }}
      className="bg-muted/30 hover:bg-muted/50 border border-border/60 p-1.5 pr-3 rounded-2xl flex items-center gap-3 group/file transition-all active:scale-[0.98] relative"
    >
      {/* Icon Container with subtle background tint */}
      <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-primary/[0.03] group-hover/file:bg-primary/[0.08] transition-colors" />
        <div className="relative z-10 scale-90">
          {getFileIcon(file.type)}
        </div>
      </div>
      
      {/* File Info */}
      <div className="flex flex-col min-w-0 py-0.5">
        <div className="flex items-center gap-1.5">
           <span className="text-[9px] font-black text-primary/60 dark:text-primary/50 uppercase tracking-wider leading-none">
            {file.type}
          </span>
          <span className="w-1 h-1 rounded-full bg-border/60" />
          <span className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-wider leading-none">
            {formatFileSize(file.size)}
          </span>
        </div>
        <span className="text-[11px] font-bold text-foreground/80 truncate max-w-[140px] mt-1 leading-none">
          {file.name}
        </span>
      </div>

      {/* Action Button */}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(file.id)}
          className="ml-1 p-1.5 hover:bg-destructive/10 rounded-lg transition-all text-muted-foreground/30 hover:text-destructive opacity-0 group-hover/file:opacity-100 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
}
