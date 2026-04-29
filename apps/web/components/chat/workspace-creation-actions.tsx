'use client';

import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import InputChat from '@/components/chat/input-chat';
import { LocalFile } from '@/hooks/use-file-upload';

interface WorkspaceCreationActionsProps {
  pendingWorkspaceData: any;
  handleCreateWorkspace: () => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  handleSend: (content: string, files: LocalFile[]) => void;
  isLoading?: boolean;
}

export default function WorkspaceCreationActions({
  pendingWorkspaceData,
  handleCreateWorkspace,
  inputValue,
  setInputValue,
  handleSend,
  isLoading = false,
}: WorkspaceCreationActionsProps) {
  return (
    <div className="relative shrink-0">
      <AnimatePresence>
        {pendingWorkspaceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-28 left-0 right-0 flex justify-center px-4"
          >
            <Button
              onClick={handleCreateWorkspace}
              disabled={isLoading}
              className="relative h-16 px-8 rounded-[2rem] bg-slate-950 text-white font-bold group overflow-hidden border border-white/10 hover:border-primary/50 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/20"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20 group-hover:rotate-12 transition-transform shadow-inner">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <span className="text-xl text-primary">✨</span>
                  )}
                </div>
                <div className="flex flex-col items-start leading-tight text-left">
                  <span className="text-sm">
                    {isLoading ? 'Subiendo archivo...' : 'Confirmar y Crear'}
                  </span>
                  <span className="text-[10px] opacity-50 uppercase tracking-widest">
                    {isLoading ? 'Aguarde un momento' : 'Workspace Inteligente'}
                  </span>
                </div>
              </div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white/5 opacity-40 group-hover:animate-shine" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <InputChat
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
      />
    </div>
  );
}
