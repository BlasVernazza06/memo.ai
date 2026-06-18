# 🧠 Memo AI — Plataforma de Aprendizaje Inteligente Automatizado

[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-091E42?style=flat-square&logo=turborepo)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/Package_Manager-pnpm-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14%2B-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![FastAPI](https://img.shields.io/badge/AI_Service-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)

**Memo AI** es un ecosistema tecnológico diseñado para optimizar los procesos de estudio. Utiliza algoritmos de Inteligencia Artificial para extraer, parsear y convertir cualquier material documental de texto y PDF en herramientas interactivas de aprendizaje personalizado, tales como flashcards y exámenes adaptativos.

---

## 🏗️ Arquitectura de Referencia

El sistema opera bajo una arquitectura distribuida y desacoplada organizada dentro de un monorepo administrado por **Turborepo** y **pnpm**.

```mermaid
graph TD
    Client[Next.js App Router Client] <-->|Rest API / JSON| Gateway[NestJS Gateway API]
    Gateway <-->|JSON / Stream| AIService[FastAPI AI Service]
    Gateway <-->|Drizzle ORM| DB[(PostgreSQL Database)]
    AIService -->|Llama 3.3| LLM[Groq Inference Engine]
    Gateway <-->|Better Auth| AuthFlow[Authentication Engine]
```

### Componentes del Monorepo

#### Aplicaciones (`/apps`)
*   **[web](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/apps/web)**: Aplicación web interactiva desarrollada con Next.js (App Router), Tailwind CSS y Lucide React. Administra la experiencia de usuario y el consumo de recursos de estudio.
*   **[api](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/apps/api)**: Core del backend implementado con NestJS. Actúa como la API Gateway, maneja la persistencia de datos, lógica de negocio y la orquestación de llamadas hacia el microservicio de IA.
*   **[ai](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/apps/ai)**: Microservicio en Python/FastAPI encargado del procesamiento de lenguaje natural y la inyección de prompts para Groq Cloud API.

#### Paquetes Compartidos (`/packages`)
*   **[db](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/packages/db)**: Módulo unificado para esquemas relacionales PostgreSQL, migraciones e inicialización de cliente Drizzle ORM.
*   **[auth](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/packages/auth)**: Proveedor de autenticación unificada del ecosistema basado en **Better Auth**.
*   **[ui](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/packages/ui)**: Colección de componentes visuales compartidos y reutilizables.
*   **[validators](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/packages/validators)**: Esquemas y tipos comunes de validación desarrollados con **Zod**.
*   **[typescript-config](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/packages/typescript-config)** & **[eslint-config](file:///c:/Users/USUARIO/Desktop/Programacion/Proyects/memo-ai/packages/eslint-config)**: Rigurosos linters de desarrollo y bases de compilación TypeScript.

---

## 🛠️ Stack Tecnológico Unificado

*   **Frontend**: Next.js 14+ (App Router), React 19, Tailwind CSS, Lucide Icons, Framer Motion.
*   **Backend & Gateway**: NestJS v10+, Node.js 18+, TypeScript.
*   **Motor de IA**: Python 3.10+, FastAPI, Groq SDK, Uvicorn.
*   **Almacenamiento e Integración**: PostgreSQL, Drizzle ORM.
*   **Monorepo**: Turborepo, pnpm workspaces.

---

## ⚙️ Guía de Inicio Rápido para Desarrolladores

### Requisitos Previos Obligatorios

*   **Node.js**: `v18.x` o superior (se recomienda `v20.x` LTS).
*   **pnpm**: `v8.x` o superior.
*   **Python**: `v3.10.x` o superior.
*   **PostgreSQL**: Base de datos activa.

### 1. Preparación del Entorno local
Clona el repositorio e instala las dependencias de manera unificada mediante pnpm:
```bash
git clone https://github.com/BlasVernazza06/memo.ai.git
cd memo-ai
pnpm install
```

### 2. Configuración de Variables de Entorno
Crea un archivo `.env` en cada uno de los directorios de aplicación con sus respectivas llaves:

*   **`apps/api/.env`**:
    ```env
    DATABASE_URL="postgresql://user:pass@localhost:5432/memo_ai"
    AI_SERVICE_URL="http://localhost:8000"
    BETTER_AUTH_SECRET="tu-secret-key-32-chars"
    ```
*   **`apps/web/.env`**:
    ```env
    NEXT_PUBLIC_API_URL="http://localhost:3000"
    NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
    ```
*   **`apps/ai/.env`**:
    ```env
    GROQ_API_KEY="gsk_your_groq_api_key_here"
    PORT=8000
    ```

### 3. Ejecución del Servidor de Desarrollo
Para arrancar de forma concurrente todas las aplicaciones y microservicios configurados en el workspace mediante Turborepo, ejecuta:
```bash
pnpm dev
```
Este comando levantará:
*   Frontend (Web) en `http://localhost:3001` (o puerto disponible).
*   Backend (API) en `http://localhost:3000`.
*   Microservicio de IA en `http://localhost:8000`.

### 4. Ciclo de Vida del Código y Tareas Comunes
*   **Formatear y Lintear código**:
    ```bash
    pnpm lint
    ```
*   **Generar esquemas/migraciones de base de datos**:
    ```bash
    pnpm --filter @repo/db db:generate
    pnpm --filter @repo/db db:push
    ```
*   **Construir bundle de producción**:
    ```bash
    pnpm build
    ```

---

## 📈 Flujo Operativo del Producto

1.  **Ingesta de Documentos (Ingestion Layer)**: El usuario carga un documento PDF/Texto en la UI de Next.js.
2.  **Validación y Traspaso (Orchestration Layer)**: El cliente envía el documento a la API de NestJS. Esta valida el payload mediante Zod schemas (`@repo/validators`) y delega la llamada HTTP/Multipart al servicio de IA.
3.  **Procesamiento y Parseo (AI Inference Layer)**: El microservicio Python procesa el texto, estructura los fragmentos de conocimiento, y realiza una consulta optimizada a Groq utilizando Llama 3.3 para generar un esquema JSON semánticamente coherente con las flashcards y preguntas de examen.
4.  **Entrega y Persistencia**: NestJS procesa el JSON resultante, almacena el material en PostgreSQL a través de Drizzle ORM y devuelve el estado consolidado a la interfaz de usuario.
