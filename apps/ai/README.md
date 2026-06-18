# 🤖 Memo AI — AI Inference & Document Processing Service (AI)

Este microservicio en **Python** y **FastAPI** compone el motor inteligente de **Memo AI**. Su propósito es extraer información textual de los documentos de estudio cargados por el usuario, procesar metadatos visuales y comunicarse con la API de **Groq** utilizando modelos de lenguaje avanzados (**Llama 3.3**) para estructurar de manera automatizada el contenido didáctico (flashcards y quices).

---

## 🛠️ Stack Tecnológico de Inteligencia Artificial

*   **Runtime**: Python v3.10 o superior.
*   **Web Framework**: FastAPI (Uvicorn como servidor ASGI).
*   **Inferencia LLM**: Groq Cloud SDK (Modelo `llama-3.3-70b-versatile`).
*   **Procesamiento de PDF**: PyMuPDF (`fitz`), permitiendo extracción de texto y renderizado de páginas.
*   **Validación de Payloads**: Pydantic v2.

---

## 🔑 Funcionalidades de Procesamiento de Ingesta

1.  **Extracción de Texto**: Procesa archivos en formato PDF y codificaciones de texto plano de manera eficiente.
2.  **Generación de Miniaturas (Thumbnails)**: Renderiza dinámicamente la primera página del documento PDF cargado, generando una representación reducida en formato JPG codificada en Base64.
3.  **Inferencia Estructurada**: Utiliza el parámetro `response_format={"type": "json_object"}` de Groq para asegurar que las respuestas del LLM cumplan rigurosamente con el formato JSON necesario para la base de datos de la API Gateway.

---

## 📁 Endpoints de la API

### 1. Procesar Documento (`POST /ai/process-document`)
Recibe un archivo por canal multipart y devuelve el texto estructurado del aprendizaje.

*   **Form Payload**:
    *   `file`: Archivo (PDF o TXT).
    *   `user_context`: Contexto adicional suministrado por el estudiante (opcional).
    *   `flashcard_count`: Cantidad objetivo de flashcards a generar (por defecto: 10).
    *   `quiz_count`: Cantidad objetivo de preguntas a generar (por defecto: 5).

*   **Respuesta Exitosa (JSON)**:
    ```json
    {
      "success": true,
      "data": {
        "flashcards": [
          { "front": "¿Pregunta?", "back": "Respuesta" }
        ],
        "quiz": [
          {
            "question": "¿Pregunta del examen?",
            "options": ["A", "B", "C", "D"],
            "correct_answer": "A"
          }
        ]
      },
      "thumbnailBase64": "data:image/jpeg;base64,..."
    }
    ```

### 2. Generar Contenido Genérico (`POST /ai/generate-content`)
Generación flexible utilizando prompts del sistema y usuario personalizados.

*   **JSON Body**:
    ```json
    {
      "system_prompt": "Prompt de contexto del sistema (opcional)",
      "user_prompt": "Indicación detallada del usuario",
      "type": "flashcards",
      "count": 10
    }
    ```

### 3. Diagnóstico de Salud (`GET /health`)
*   **Response**: `{"status": "ok"}`

---

## ⚙️ Guía de Inicio Rápido para Desarrollo

### 1. Creación e Instalación de Entorno Virtual

Es fundamental aislar las librerías de Python. Posiciona tu terminal en `apps/ai`:

```bash
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar entorno virtual
# En Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# En Linux/macOS:
source venv/bin/activate

# 3. Instalar librerías requeridas
pip install -r requirements.txt
```

### 2. Variables de Entorno Requeridas (`apps/ai/.env`)

```env
GROQ_API_KEY="gsk_your_groq_api_key"
PORT=8000
```

### 3. Ejecución del Microservicio

Para levantar el servicio de IA en modo reload (recarga automática al guardar cambios):

```bash
uvicorn src.main:app --reload --port 8000
```
La documentación interactiva autogenerada estará disponible en:
*   Swagger UI: `http://localhost:8000/docs`
*   ReDoc: `http://localhost:8000/redoc`
