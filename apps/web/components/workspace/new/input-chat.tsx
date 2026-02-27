'use client';

import { FileText, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';

import { useAutoResize } from '@/hooks/use-auto-resize';
import { LocalFile, useFileUpload } from '@/hooks/use-file-upload';

import AttachmentCard from './attachment-card';

interface InputChatProps {
  onSend: (message: string, files: LocalFile[]) => void;
}

export default function InputChat({ onSend }: InputChatProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { files, error, handleFileSelect, removeFile, clearFiles } =
    useFileUpload();
  useAutoResize(textareaRef, inputValue);

  const handleSend = () => {
    if (!inputValue.trim() && files.length === 0) return;

    onSend(inputValue, files);
    setInputValue('');
    clearFiles();
  };

  return (
    <div className="shrink-0 p-4">
      {/* Hidden file input — se dispara desde el botón */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.odt"
      />

      <div className="bg-white border border-slate-200/60 rounded-4xl shadow-2xl p-3 space-y-3 relative group">
        {/* Previews de archivos seleccionados (locales, sin subir) */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 px-3 pb-2  overflow-hidden"
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

        <div className="flex items-end gap-2 px-1 relative z-10">
          <div className="flex flex-col w-full gap-1">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Escribe el nombre del workspace o cuéntame qué quieres estudiar..."
              className="w-full bg-transparent border-none focus:ring-0 outline-none focus:outline-none resize-none px-4 py-3 text-base font-semibold text-slate-900 placeholder:text-slate-300 overflow-y-auto max-h-[200px] scrollbar-hide ease-out duration-200"
            />
            <div className="flex w-full justify-between items-center gap-2 px-1 pb-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-blue-500 transition-all active:scale-90 cursor-pointer"
                  title="Adjuntar Archivo"
                >
                  <FileText className="w-5 h-5" />
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputValue.trim() && files.length === 0}
                  className="p-3 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-90 transition-all disabled:opacity-30 disabled:scale-100 disabled:shadow-none cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">
        Memo IA puede cometer errores. Verifica la información importante.
      </p>
    </div>
  );
}
