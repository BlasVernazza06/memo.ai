import os
import json
import base64
from dotenv import load_dotenv

import fitz  # PyMuPDF
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from groq import Groq
from src.prompts import SYSTEM_PROMPT, USER_PROMPT_TEMPLATE

load_dotenv()

app = FastAPI(title="Memo AI - Python Service")
# Inicializar cliente de Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes):
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def get_pdf_thumbnail(file_bytes):
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        if len(doc) == 0:
            return None
        page = doc.load_page(0)  # Primera página
        pix = page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5)) # Miniatura reducida
        img_data = pix.tobytes("jpg")
        base64_img = base64.b64encode(img_data).decode("utf-8")
        return f"data:image/jpeg;base64,{base64_img}"
    except Exception as e:
        print(f"Error generating thumbnail: {e}")
        return None

@app.post("/ai/process-document")
async def process_document(
    file: Optional[UploadFile] = File(None),
    user_context: str = Form(""),
    flashcard_count: int = Form(10),
    quiz_count: int = Form(5)
):
    try:
        text_content = ""
        
        # 1. Leer y extraer texto (solo si hay archivo)
        if file:
            content = await file.read()
            if file.filename.endswith(".pdf"):
                text_content = extract_text_from_pdf(content)
            else:
                text_content = content.decode("utf-8")
        
        # Si no hay archivo ni contexto, lanzamos error
        if not text_content and not user_context:
            raise HTTPException(status_code=400, detail="No se proporcionó contenido ni contexto.")

        # 2. Construir el prompt inyectando los datos
        user_prompt = USER_PROMPT_TEMPLATE.format(
            user_context=user_context,
            file_content=text_content[:15000],  # Limitamos para no exceder tokens básicos
            flashcard_count=flashcard_count,
            quiz_count=quiz_count
        )

        # 3. Llamada a Groq (Rápido y Gratuito)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format={ "type": "json_object" }
        )

        thumbnail_base64 = None
        if file and file.filename.endswith(".pdf"):
            # Re-leer bytes para la miniatura ya que el puntero se movió al leer el texto
            await file.seek(0)
            content = await file.read()
            thumbnail_base64 = get_pdf_thumbnail(content)

        return {
            "success": True,
            "data": json.loads(response.choices[0].message.content),
            "thumbnailBase64": thumbnail_base64
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok"}
