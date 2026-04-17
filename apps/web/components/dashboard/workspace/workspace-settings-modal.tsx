'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { Calendar, ChevronRight, Layers, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

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
  onSuccess,
  workspace,
}: WorkspaceSettingsModalProps) {
  const router = useRouter();
  const [view, setView] = useState<ViewState>('settings');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: workspace.name,
    icon: workspace.icon || '',
    description: workspace.description || '',
  });

  // Sincronizar el estado interno con las props cuando el modal se abre
  // o cuando los datos del workspace cambian externamente
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: workspace.name,
        icon: workspace.icon || '',
        description: workspace.description || '',
      });
    }
  }, [isOpen, workspace.name, workspace.icon, workspace.description]);

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
        console.error(result.error);
        setIsDeleting(false);
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-[#f8fafc] border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl relative z-101 overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-white">
              <h2 className="text-xl font-semibold text-slate-900">
                Ajustes del Workspace
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400"
                disabled={isDeleting || isSaving}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <AnimatePresence mode="wait">
                {view === 'settings' ? (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    {/* General Section Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 text-blue-600">
                        <Layers className="w-5 h-5" />
                        <h3 className="font-semibold text-slate-900">
                          General
                        </h3>
                      </div>

                      <UpdateWorkspaceForm
                        formData={formData}
                        setFormData={setFormData}
                      />

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                          variant="ghost"
                          onClick={handleClose}
                          className="font-medium text-slate-600 hover:bg-slate-50"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 min-w-32"
                        >
                          {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                          ) : (
                            'Actualizar'
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Meta Info Row */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400">
                            Última actualización
                          </p>
                          <p className="text-sm font-semibold text-slate-700">
                            {workspace.updatedAt
                              ? new Date(
                                  workspace.updatedAt,
                                ).toLocaleDateString()
                              : 'Recientemente'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-green-600 uppercase">
                          Activo
                        </span>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between group overflow-hidden">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-red-50 rounded-xl text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Eliminar Workspace
                          </p>
                          <p className="text-xs text-slate-500">
                            Esta acción borrará todos los datos asociados.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setView('delete-confirm')}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
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
