'use client';

import { useState } from 'react';
import { apiFetchClient } from '@/lib/api-client';

interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
  url: string;
}

/**
 * Hook para usar en componentes de React. 
 * Maneja estados de carga (isUploading) y errores automáticamente.
 */
export function useStorage() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      // 1. Pedir Presigned URL al backend (usamos apiFetchClient para mandar las cookies/auth automáticamente)
      const presignedData = await apiFetchClient<PresignedUrlResponse>(
        `/storage/presigned-url?fileName=${encodeURIComponent(
          file.name,
        )}&contentType=${encodeURIComponent(file.type)}`,
      );

      // 2. Subir a S3 directamente
      const uploadResponse = await fetch(presignedData.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al subir el archivo a S3');
      }

      // 3. Devolver datos
      return {
        key: presignedData.key,
        url: presignedData.url,
      };
    } catch (err: any) {
      const errorMessage = err.message || 'Error desconocido al subir el archivo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    error,
  };
}

/**
 * Función pura para usar fuera de componentes de React (o si no necesitas manejar estados de carga).
 */
export async function uploadFileToStorage(file: File) {
  const presignedData = await apiFetchClient<PresignedUrlResponse>(
    `/storage/presigned-url?fileName=${encodeURIComponent(
      file.name,
    )}&contentType=${encodeURIComponent(file.type)}`,
  );

  const uploadResponse = await fetch(presignedData.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error('Error al subir el archivo a S3');
  }

  return {
    key: presignedData.key,
    url: presignedData.url,
  };
}
