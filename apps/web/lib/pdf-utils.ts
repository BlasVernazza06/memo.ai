import * as pdfjs from 'pdfjs-dist';

// Configurar el worker de PDF.js usando un CDN para evitar problemas de empaquetado en Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * Genera una miniatura de la primera página de un archivo PDF.
 * @param file El archivo PDF seleccionado por el usuario.
 * @returns Una promesa que resuelve con el Base64 de la imagen o null si falla.
 */
export async function generatePDFThumbnail(file: File): Promise<string | null> {
  if (file.type !== 'application/pdf') return null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    // Obtenemos la primera página
    const page = await pdf.getPage(1);
    
    // Definimos la escala (0.5 para que sea pequeña y no pese mucho)
    const viewport = page.getViewport({ scale: 0.8 });
    
    // Creamos un canvas virtual para renderizar la página
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) return null;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Renderizamos la página en el canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // Convertimos el contenido del canvas a Base64 (PNG)
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    return null;
  }
}
