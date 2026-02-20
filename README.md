# 🧠 Memo AI

**Memo AI** es una plataforma inteligente diseñada para transformar tus documentos de estudio en materiales de aprendizaje interactivos como flashcards y quices, utilizando inteligencia artificial de vanguardia.

## 🚀 Arquitectura del Proyecto

Este es un monorepo gestionado con **Turborepo** y **pnpm**, dividido en las siguientes aplicaciones y paquetes:

### Aplicaciones (Apps)

- `web`: Frontend desarrollado con **Next.js**, **Tailwind CSS** y **Lucide React**. Interfaz de usuario intuitiva para subir documentos y estudiar.
- `api`: Backend robusto construido con **NestJS**. Maneja la lógica de negocio, autenticación y comunicación entre servicios.
- `ai`: Microservicio de Inteligencia Artificial desarrollado en **Python** con **FastAPI**. Utiliza **Groq (Llama 3.3)** para procesar documentos y generar contenido educativo de forma instantánea.

### Paquetes compartidos (Packages)

- `db`: Esquema de base de datos y cliente gestionado con **Drizzle ORM**.
- `ui`: Biblioteca de componentes de UI compartidos.
- `validators`: Esquemas de validación comunes utilizando **Zod**.
- `typescript-config` & `eslint-config`: Configuraciones compartidas de desarrollo.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14+, Tailwind CSS, Framer Motion.
- **Backend**: NestJS, Node.js.
- **IA**: Python, FastAPI, Groq Cloud API (Llama 3).
- **Base de Datos**: PostgreSQL con Drizzle ORM.
- **Monorepo**: Turborepo, pnpm.

## ⚙️ Configuración e Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [pnpm](https://pnpm.io/)
- [Python 3.10+](https://www.python.org/) (para el servicio de IA)

### Pasos para comenzar

1.  **Clonar el repositorio:**

    ```sh
    git clone https://github.com/BlasVernazza06/memo.ai.git
    cd memo-ai
    ```

2.  **Instalar dependencias:**

    ```sh
    pnpm install
    ```

3.  **Configurar variables de entorno:**
    Crea archivos `.env` en las carpetas correspondientes:
    - `apps/api/.env`
    - `apps/web/.env`
    - `apps/ai/.env` (Necesitas una `GROQ_API_KEY`)

4.  **Ejecutar el proyecto en desarrollo:**
    ```sh
    pnpm dev
    ```

## 📖 Cómo funciona

1.  **Sube un documento**: Carga tus PDFs o archivos de texto en la plataforma.
2.  **Procesamiento IA**: El servicio de Python extrae el contenido y lo envía a Llama 3 para generar preguntas clave.
3.  **Estudia**: Recibe automáticamente flashcards y quices personalizados para reforzar tu aprendizaje.

---

Desarrollado con ❤️ por [Blas Vernazza](https://github.com/BlasVernazza06)
