import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly pythonServiceUrl = 'http://127.0.0.1:8000';

  async processDocument(file: any, userContext: string) {
    try {
      const formData = new FormData();

      // Solo adjuntamos el archivo si existe
      if (file) {
        const blob = new Blob([file.buffer], { type: file.mimetype });
        formData.append('file', blob, file.originalname);
      }
      
      formData.append('user_context', userContext);
      formData.append('flashcard_count', '5');
      formData.append('quiz_count', '3');

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
        throw new Error(`Python Service Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return JSON.parse(result.data);
    } catch (error) {
      console.error('DETAILED AI SERVICE ERROR:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause
      });
      throw new InternalServerErrorException(
        'Error al procesar el documento con IA: ' + error.message,
      );
    }
  }
}
