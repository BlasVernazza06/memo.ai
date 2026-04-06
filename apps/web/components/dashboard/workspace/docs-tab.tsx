import Image from 'next/image';

import { useState } from 'react';

import { PDF } from '@ridemountainpig/svgl-react';
import { Download, FileText, ImageIcon } from 'lucide-react';

import type { DbDocument } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

import SearchInput from '@/components/shared/search-input';
import { formatFileSize } from '@/hooks/use-file-size';

export function DocsList({ docs }: { docs: DbDocument[] }) {
  const [filteredDocs, setFilteredDocs] = useState(docs);

  const handleDownload = async (
    e: React.MouseEvent,
    docUrl: string,
    docName: string,
  ) => {
    e.stopPropagation(); // Evita que se abra la vista principal al clickear el botón
    try {
      // 1. Descargar el archivo a la memoria del navegador (Blob)
      const response = await fetch(docUrl);
      const blob = await response.blob();

      // 2. Crear una URL local temporal apuntando a ese Blob
      const url = window.URL.createObjectURL(blob);

      // 3. Crear un enlace HTML invisible y hacerle click mediante código
      const a = document.createElement('a');
      a.href = url;
      a.download = docName; // Forzar el atributo download
      document.body.appendChild(a);
      a.click();

      // 4. Limpieza de memoria
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  return (
    <div className="space-y-8">
      <SearchInput
        data={docs}
        onResultsChange={setFilteredDocs}
        placeholder="Buscar documentos..."
      />

      {filteredDocs.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground mb-2">
            <FileText className="w-8 h-8 opacity-50" />
          </div>
          <p className="text-muted-foreground font-medium text-lg">
            No has subido documentos aún.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocs.map((doc) => {
            // Mockup: Supongamos que en el futuro agregarás "thumbnailUrl" a DbDocument.
            // Por el momento, si es imagen, usamos la URL. Si no, no hay thumbnail válido.
            const isImage = doc.type.toLowerCase().includes('image');
            const renderPreviewUrl =
              doc.thumbnailUrl || (isImage ? doc.url : null);

            return (
              <div
                key={doc.id}
                className="bg-card border border-border/50 rounded-2xl flex flex-col hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                {/* Zona de Previsualización (Thumbnail) - Estilo Google Drive */}
                <div className="h-40 w-full bg-muted/30 border-b border-border/50 relative overflow-hidden flex items-center justify-center group-hover:bg-muted/50 transition-colors">
                  {renderPreviewUrl ? (
                    <Image
                      src={renderPreviewUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground/40 group-hover:text-primary/40 transition-colors duration-500 group-hover:scale-110">
                      <FileText className="w-16 h-16 stroke-[1.5]" />
                      <span className="text-[10px] uppercase font-black tracking-widest mt-2 bg-background/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        No Preview
                      </span>
                    </div>
                  )}

                  {/* Acciones Rápidas Flotantes (Solo visibles en Hover) */}
                  <div className="absolute top-2 right-2 flex gap-1 bg-background/60 backdrop-blur-md rounded-xl p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg hover:bg-background"
                      onClick={(e) => handleDownload(e, doc.url, doc.name)}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Zona de Metadatos (Footer de la Card) */}
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${isImage ? 'bg-blue-500/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'}`}
                    >
                      <PDF className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-bold text-foreground text-sm tracking-tight truncate group-hover:text-primary transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1.5">
                        <span className="uppercase tracking-wider">
                          {doc.type}
                        </span>
                        <span>•</span>
                        <span>{formatFileSize(doc.sizeBytes || 0)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
