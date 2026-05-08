'use client';

import { useState } from 'react';

/**
 * Hook para descargar archivos desde una URL conservando el nombre original.
 */
export function useDownloadFile() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (url: string, fileName: string) => {
    if (!url) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener el archivo');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Limpieza
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('[useDownloadFile] Error:', error);
      // Fallback: abrir en pestaña nueva si falla la descarga directa
      window.open(url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadFile, isDownloading };
}
