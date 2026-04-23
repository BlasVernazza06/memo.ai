import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly pythonServiceUrl = 'http://127.0.0.1:8000';

  async processDocument(file: Express.Multer.File | undefined, userContext: string) {
    try {
      const formData = new FormData();

      // Solo adjuntamos el archivo si existe
      if (file) {
        const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
        formData.append('file', blob, file.originalname);
      }

      formData.append('user_context', userContext || '');
      formData.append('flashcard_count', '10');
      formData.append('quiz_count', '15');

      const response = await fetch(
        `${this.pythonServiceUrl}/ai/process-document`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Python Service Error Response:', errorText);
        throw new Error(
          `Python Service Error: ${response.status} - ${errorText}`,
        );
      }

      const result = await response.json();
      
      // En el pasado se hacia JSON.parse aquí, pero el Python backend ya devuelve un objeto
      const finalData = result.data;
      if (result.thumbnailBase64) {
        finalData.thumbnailBase64 = result.thumbnailBase64;
      }
      return finalData;
    } catch (error) {
      console.error('DETAILED AI SERVICE ERROR:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      });
      throw new InternalServerErrorException(
        'Error al procesar el documento con IA: ' + error.message,
      );
    }
  }
}
