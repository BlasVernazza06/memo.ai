'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { apiFetchClient } from '@/lib/api-client';

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspace: {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
  };
}

export default function WorkspaceSettingsModal({
  isOpen,
  onClose,
  workspace,
}: WorkspaceSettingsModalProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este workspace? Esta acción no se puede deshacer.')) return;
    
    try {
      setIsDeleting(true);
      await apiFetchClient(`/workspaces/${workspace.id}`, { method: 'DELETE' });
      router.push('/dashboard');
      router.refresh(); // Refresh dashboard to remove deleted item
    } catch (error) {
      console.error('Error deleting workspace:', error);
      alert('Hubo un error al eliminar el workspace.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card border border-border rounded-[2.5rem] w-full max-w-lg shadow-2xl relative z-101 overflow-hidden"
          >
            <div className="p-8 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-black text-foreground">
                Configuración del Workspace
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">
                  Nombre
                </label>
                <input
                  className="w-full bg-muted text-foreground border-none rounded-2xl px-5 h-14 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-hidden"
                  defaultValue={workspace.name}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">
                  Descripción
                </label>
                <textarea
                  className="w-full bg-muted text-foreground border-none rounded-2xl px-5 py-4 font-bold focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none outline-hidden"
                  defaultValue={workspace.description || ''}
                />
              </div>
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-primary text-white font-black rounded-2xl h-14"
                  onClick={onClose}
                >
                  Guardar Cambios
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-rose-500/10 text-rose-500 hover:text-white dark:hover:text-rose-50 hover:bg-rose-500 font-black rounded-2xl h-14 px-6 md:px-8 transition-colors disabled:opacity-50"
                  title="Eliminar Workspace"
                >
                  <Trash2 className={`w-5 h-5 ${isDeleting ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
