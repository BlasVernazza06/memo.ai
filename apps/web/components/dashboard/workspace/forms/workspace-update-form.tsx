import { UpdateWorkspaceDTO } from '@repo/validators';

import IconSelector from '@/components/dashboard/workspace/forms/icon-selector';

interface UpdateWorkspaceFormProps {
  formData: UpdateWorkspaceDTO;
  setFormData: React.Dispatch<React.SetStateAction<UpdateWorkspaceDTO>>;
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
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Ej: Neurociencia"
          />
        </div>
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-slate-600 ml-1">
            Icono (opcional)
          </label>
          <div className="flex gap-2">
            <IconSelector
              currentIcon={formData.icon || ''}
              onSelect={(icon) => setFormData((prev) => ({ ...prev, icon }))}
            />
            <input
              className="w-16 bg-white border border-slate-200 rounded-xl text-center h-12 text-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden text-slate-900"
              value={formData.icon || ''}
              onChange={(e) => {
                const val = e.target.value;
                // Regex para detectar emojis (basico pero efectivo)
                const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
                const matches = val.match(emojiRegex);
                
                // Si el valor está vacío, lo permitimos
                if (val === '') {
                  setFormData((prev) => ({ ...prev, icon: '' }));
                  return;
                }

                // Si hay emojis, tomamos el primero
                if (matches) {
                  setFormData((prev) => ({ ...prev, icon: matches[0] }));
                }
              }}
              placeholder="✨"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-600 ml-1">
          Color de ambiente
        </label>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Violeta', value: '#7C3AED' },
            { name: 'Azul', value: '#2563EB' },
            { name: 'Esmeralda', value: '#059669' },
            { name: 'Rosa', value: '#E11D48' },
            { name: 'Ambar', value: '#D97706' },
            { name: 'Indigo', value: '#4F46E5' },
            { name: 'Pizarra', value: '#475569' },
          ].map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  bgColor: color.value,
                }))
              }
              className={`w-10 h-10 rounded-xl border-2 transition-all active:scale-95 ${
                formData.bgColor === color.value
                  ? 'border-slate-400 scale-110 shadow-lg'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
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
            setFormData((prev) => ({
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
