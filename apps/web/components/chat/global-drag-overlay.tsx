'use client';

import { Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface GlobalDragOverlayProps {
  onDrop: (files: File[]) => void;
}

export default function GlobalDragOverlay({ onDrop }: GlobalDragOverlayProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => prev + 1);
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => prev - 1);
      if (dragCounter - 1 === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setDragCounter(0);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        onDrop(files);
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [dragCounter, onDrop]);

  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-2xl" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl aspect-video rounded-[3rem] border-4 border-dashed border-primary/40 bg-card/50 shadow-2xl flex flex-col items-center justify-center gap-6 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 rounded-3xl bg-primary text-white flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.3)] relative z-10"
              >
                <Upload className="w-12 h-12" />
              </motion.div>
              <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            </div>

            <div className="text-center space-y-2 relative z-10">
              <h2 className="text-4xl font-black tracking-tighter text-foreground">
                Suelta para empezar a <span className="text-primary">estudiar</span>
              </h2>
              <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs opacity-60">
                Aceptamos archivos PDF para crear tu Workspace
              </p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary/20 rounded-tl-2xl" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary/20 rounded-tr-2xl" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary/20 rounded-bl-2xl" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary/20 rounded-br-2xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
