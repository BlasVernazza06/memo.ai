'use client';

import { useEffect, useRef, useState } from 'react';

import { FileText, Upload, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import AttachmentCard from '@/components/chat/attachment-card';
import { useAutoResize } from '@/hooks/use-auto-resize';
import { LocalFile, useFileUpload } from '@/hooks/use-file-upload';

interface InputChatProps {
  onSend: (message: string, files: LocalFile[]) => void;
  value: string;
  onChange: (val: string) => void;
}

export default function InputChat({ onSend, value, onChange }: InputChatProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { files, error, handleFileSelect, addFiles, removeFile, clearFiles } =
    useFileUpload();

  useAutoResize(textareaRef, value);

  // Enfocar el textarea si el valor cambia (útil cuando se hace clic en una card)
  useEffect(() => {
    if (value && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [value]);

  const handleSend = () => {
    if (!value.trim() && files.length === 0) return;
    onSend(value, files);
    onChange('');
    clearFiles();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(
      (file) => file.type === 'application/pdf',
    );

    if (pdfFiles.length > 0) {
      addFiles(pdfFiles);
    }
  };

  const charCount = value.length;

  return (
    <div
      className="shrink-0 p-4 md:p-6 lg:p-8 pt-0"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf"
      />

      <div
        className={`bg-card border ${isDragging ? 'border-primary ring-4 ring-primary/10 scale-[1.01]' : 'border-border/60'} rounded-[2.5rem] p-4 transition-all focus-within:border-primary/50 group relative overflow-hidden backdrop-blur-xl`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />

        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/5 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-2 pointer-events-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg animate-bounce">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-primary">
                Suelta tu PDF aquí
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 px-2 pb-3 overflow-hidden"
            >
              {files.map((file) => (
                <AttachmentCard
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-4 relative z-10">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            placeholder="¿Qué vamos a estudiar hoy? Describe tu proyecto o adjunta archivos..."
            className="w-full bg-transparent border-none focus:ring-0 outline-none focus:outline-none resize-none px-2 py-1 text-base font-medium text-foreground placeholder:text-muted-foreground/30 overflow-y-auto max-h-[150px] scrollbar-hide transition-all"
          />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-all active:scale-95 text-[11px] font-black uppercase tracking-widest border border-transparent hover:border-border/50"
              >
                <FileText className="w-4 h-4" />
                Adjuntar Material
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-[10px] font-black tabular-nums transition-colors ${charCount > 900 ? 'text-orange-500' : 'text-muted-foreground/20'}`}
              >
                {charCount}/1000
              </span>

              <button
                type="button"
                onClick={handleSend}
                disabled={!value.trim() && files.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:scale-100 group/btn shadow-lg shadow-primary/20"
              >
                <Zap className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" />
                Generar
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-[10px] font-bold text-center mt-2 uppercase tracking-widest"
        >
          {error}
        </motion.p>
      )}

      <p className="text-center text-[9px] font-bold text-muted-foreground/10 uppercase tracking-[0.4em] mt-8">
        Memo IA · Inteligencia Artificial para el Aprendizaje
      </p>
    </div>
  );
}
