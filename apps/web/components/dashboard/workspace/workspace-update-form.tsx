import { UpdateWorkspaceSchema } from '@repo/validators';
import { z } from 'zod';

interface UpdateWorkspaceFormProps {
  formData: z.infer<typeof UpdateWorkspaceSchema>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function UpdateWorkspaceForm({
  formData,
  setFormData,
}: UpdateWorkspaceFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 ml-1">
            Nombre del workspace
          </label>
          <input
            className="w-full bg-white border border-slate-200 rounded-xl px-4 h-11 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden text-slate-900"
            value={formData.name || ''}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Ej: Neurociencia"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 ml-1">
            Icono (opcional)
          </label>
          <input
            className="w-full bg-white border border-slate-200 rounded-xl px-4 h-11 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden text-slate-900"
            value={formData.icon || ''}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                icon: e.target.value,
              }))
            }
            placeholder="💡, ⚡, etc"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 ml-1">
          Descripción
        </label>
        <textarea
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-24 resize-none outline-hidden text-slate-900"
          value={formData.description || ''}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Describe el propósito de este espacio..."
        />
      </div>
    </div>
  );
}
