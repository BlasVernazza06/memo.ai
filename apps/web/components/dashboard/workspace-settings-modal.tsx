'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import {
  AlertTriangle,
  Clock,
  Info,
  Save,
  Settings,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import { deleteWorkspaceAction } from '@/lib/actions/workspace-actions';

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspace: {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    updatedAt?: Date;
  };
}

type ViewState = 'settings' | 'delete-confirm';

export default function WorkspaceSettingsModal({
  isOpen,
  onClose,
  workspace,
}: WorkspaceSettingsModalProps) {
  const router = useRouter();
  const [view, setView] = useState<ViewState>('settings');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Volver a la vista principal al cerrar
  const handleClose = () => {
    setView('settings');
    onClose();
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteWorkspaceAction(workspace.id);

      if (result.success) {
        router.push('/dashboard');
        handleClose();
      } else {
        // Podríamos usar un toast aquí en el futuro
        console.error(result.error);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting workspace:', error);
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulación de guardado por ahora
    setTimeout(() => {
      setIsSaving(false);
      handleClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
          />

          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card/90 border border-border/50 rounded-[2.5rem] w-full max-w-lg shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative z-101 overflow-hidden backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${view === 'delete-confirm' ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'}`}
                >
                  {view === 'delete-confirm' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Settings className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground leading-none">
                    {view === 'delete-confirm'
                      ? 'Confirmar Eliminación'
                      : 'Ajustes del Workspace'}
                  </h3>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
                    {view === 'delete-confirm'
                      ? 'Acción Irreversible'
                      : 'Gestión y Personalización'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
                disabled={isDeleting || isSaving}
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {view === 'settings' ? (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 space-y-8"
                >
                  {/* General Info */}
                  <div className="space-y-6">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Settings className="w-3 h-3 text-primary/50" /> Nombre del Workspace
                      </label>
                      <input
                        className="w-full bg-card text-foreground border border-border/60 rounded-2xl px-5 h-14 font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all outline-hidden placeholder:text-muted-foreground/20 shadow-xs text-sm"
                        defaultValue={workspace.name}
                        placeholder="Ej: Neurociencia Aplicada"
                      />
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Info className="w-3 h-3 text-primary/50" /> Descripción del Proyecto
                      </label>
                      <textarea
                        className="w-full bg-card text-foreground border border-border/60 rounded-2xl px-5 py-4 font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all h-28 resize-none outline-hidden placeholder:text-muted-foreground/20 shadow-xs text-sm"
                        defaultValue={workspace.description || ''}
                        placeholder="Define el enfoque de este espacio..."
                      />
                    </div>
                  </div>

                  {/* Activity Info */}
                  <div className="flex items-center justify-between p-5 rounded-[2rem] bg-muted/30 border border-border/40">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white border border-border/50 rounded-xl text-muted-foreground shadow-sm">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                          Sincronizado
                        </span>
                        <span className="text-sm font-black text-foreground/80 lowercase italic">
                          {workspace.updatedAt
                            ? new Date(workspace.updatedAt).toLocaleDateString()
                            : 'actualmente'}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[8px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       Activo
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-foreground text-background font-black rounded-2xl h-16 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-foreground/10 flex items-center justify-center gap-3"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background animate-spin rounded-full" />
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Actualizar Espacio</span>
                        </>
                      )}
                    </Button>

                    <button
                      onClick={() => setView('delete-confirm')}
                      className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500/50 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Eliminar definitivamente</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="delete"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-8 space-y-8"
                >
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-3 text-rose-500 mb-2">
                      <div className="p-2 bg-rose-500 text-white rounded-lg shadow-lg shadow-rose-500/30">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span className="font-black text-sm uppercase tracking-widest">
                        Atención
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground leading-relaxed">
                      Estás a punto de eliminar el workspace{' '}
                      <span className="text-rose-500">&quot;{workspace.name}&quot;</span>.
                    </p>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                      Esta acción es permanente. Se eliminarán todos los
                      documentos, flashcards y cuestionarios asociados a esta
                      unidad.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="ghost"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full bg-rose-500 text-white hover:bg-rose-600 font-black rounded-2xl h-16 shadow-2xl shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                      ) : (
                        <>
                          <Trash2 className="w-5 h-5" />
                          ¡Sí, eliminar definitivamente!
                        </>
                      )}
                    </Button>

                    <button
                      onClick={() => setView('settings')}
                      disabled={isDeleting}
                      className="w-full h-14 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                    >
                      Mejor no, volver atrás
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
