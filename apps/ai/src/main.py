from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Memo AI - Python Service")

# Configurar CORS para permitir peticiones desde el API de NestJS y el Web App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "memo-ai-python",
        "description": "Microservicio de IA para procesamiento de documentos y generación de contenido"
    }

@app.get("/health")
async def health_check():
    return {"status": "ok"}
