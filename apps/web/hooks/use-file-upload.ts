'use client';

import { useState } from 'react';

import { getFileType } from '@/hooks/use-file-type';
import { type LocalFile } from '@repo/validators';
export type { LocalFile };

export function useFileUpload() {
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (files.length >= 1) {
      setError(
        'Solo podés adjuntar un archivo a la vez. Eliminá el actual para subir otro.',
      );
      setTimeout(() => setError(null), 3000);
      event.target.value = '';
      return;
    }

    const file = selectedFiles[0];
    if (!file) return;
    const newFile: LocalFile = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: getFileType(file.type, file.name),
      size: file.size,
      file,
    };

    setFiles([newFile]);
    event.target.value = '';
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearFiles = () => setFiles([]);

  return {
    files,
    error,
    handleFileSelect,
    removeFile,
    clearFiles,
  };
}
