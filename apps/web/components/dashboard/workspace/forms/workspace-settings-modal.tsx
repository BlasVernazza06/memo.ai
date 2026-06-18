'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { Calendar, ChevronRight, Layers, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';

import { Button } from '@repo/ui/components/ui/button';
import { UpdateWorkspaceDTO, WorkspaceDetailDTO } from '@repo/validators';

import {
  deleteWorkspaceAction,
  updateWorkspaceAction,
} from '@/lib/actions/workspace-actions';

import WorkspaceDeleteModal from './workspace-delete-modal';
import UpdateWorkspaceForm from './workspace-update-form';

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  workspace: WorkspaceDetailDTO;
}

type ViewState = 'settings' | 'delete-confirm';

export default function WorkspaceSettingsModal({
  isOpen,
  onClose,
  onSuccess,
  workspace,
}: WorkspaceSettingsModalProps) {
  const router = useRouter();
  const [view, setView] = useState<ViewState>('settings');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<UpdateWorkspaceDTO>({
    name: workspace.name,
    icon: workspace.icon || '',
    description: workspace.description || '',
    bgColor: workspace.bgColor || '#7C3AED',
  });

  // Sincronizar el estado interno con las props cuando el modal se abre
  // o cuando los datos del workspace cambian externamente
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: workspace.name,
        icon: workspace.icon || '',
        description: workspace.description || '',
        bgColor: workspace.bgColor || '#7C3AED',
      });
    }
  }, [
    isOpen,
    workspace.name,
    workspace.icon,
    workspace.description,
    workspace.bgColor,
  ]);

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
        toast.success('Workspace eliminado con Exito');
        handleClose();
      } else {
        console.error(result.error);
        setIsDeleting(false);
        toast.error('Eliminacion fallida');
      }
    } catch (error) {
      console.error('Error deleting workspace:', error);
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const result = await updateWorkspaceAction(workspace.id, formData);

      if (result.success) {
        onSuccess?.(); // IMPORTANTE: Llama al refresco de la página
        handleClose();
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error updating workspace:', error);
    } finally {
      setIsSaving(false); // Resetea el botón SIEMPRE
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-background border border-border rounded-2xl sm:rounded-3xl w-full max-w-lg md:max-w-xl shadow-2xl relative z-101 flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden"
          >
            {/* Header - Fixed at the top */}
            <div className="px-5 py-4 sm:px-8 sm:py-5 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-xs">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                Ajustes del Workspace
              </h2>
              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
                disabled={isDeleting || isSaving}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {view === 'settings' ? (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* General Section Card */}
                    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-3 text-blue-500">
                        <Layers className="w-5 h-5" />
                        <h3 className="font-semibold text-foreground">
                          General
                        </h3>
                      </div>

                      <UpdateWorkspaceForm
                        formData={formData}
                        setFormData={setFormData}
                      />

                      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-2">
                        <Button
                          variant="ghost"
                          onClick={handleClose}
                          className="font-medium text-muted-foreground hover:bg-muted w-full sm:w-auto"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 min-w-32 w-full sm:w-auto"
                        >
                          {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full mx-auto" />
                          ) : (
                            'Actualizar'
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Meta Info Row */}
                    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Última actualización
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {workspace.updatedAt
                              ? new Date(
                                  workspace.updatedAt,
                                ).toLocaleDateString()
                              : 'Recientemente'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 self-start sm:self-auto">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-green-500 uppercase">
                          Activo
                        </span>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group overflow-hidden">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500 shrink-0">
                          <Trash2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Eliminar Workspace
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Esta acción borrará todos los datos asociados.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setView('delete-confirm')}
                        className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all w-full sm:w-auto"
                      >
                        Eliminar
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <WorkspaceDeleteModal
                    workspaceName={workspace.name}
                    isDeleting={isDeleting}
                    onDelete={handleDelete}
                    onCancel={() => setView('settings')}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
