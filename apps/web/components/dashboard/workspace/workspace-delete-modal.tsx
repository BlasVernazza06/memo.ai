'use client';

import { AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

interface WorkspaceDeleteModalProps {
  workspaceName: string;
  onDelete: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function WorkspaceDeleteModal({
  workspaceName,
  onDelete,
  onCancel,
  isDeleting,
}: WorkspaceDeleteModalProps) {
  return (
    <motion.div
      key="delete"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-6"
    >
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="font-bold">¿Estás completamente seguro?</h3>
        </div>
        <p className="text-sm text-red-700 leading-relaxed">
          Estás eliminando <span className="font-bold">&quot;{workspaceName}&quot;</span>.
          Esta acción es definitiva y resultará en la pérdida de todos los
          documentos y configuraciones.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={onDelete}
          disabled={isDeleting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-red-500/10"
        >
          {isDeleting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
          ) : (
            'Confirmar Eliminación'
          )}
        </Button>
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="w-full py-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Cancelar y volver
        </button>
      </div>
    </motion.div>
  );
}
