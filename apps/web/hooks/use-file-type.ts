export function getFileType(mimeType: string, fileName?: string): string {
  // PDF
  if (mimeType === 'application/pdf') return 'pdf';

  // Word (.doc / .docx) + LibreOffice Writer (.odt)
  if (
    mimeType === 'application/msword' || // .doc
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // .docx
    mimeType === 'application/vnd.oasis.opendocument.text' // .odt (LibreOffice)
  )
    return 'doc';

  // Fallback: check file extension if MIME is generic (e.g. "application/octet-stream")
  if (fileName) {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'doc' || ext === 'docx' || ext === 'odt') return 'doc';
  }

  return 'text';
}
