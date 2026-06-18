# 🌐 Memo AI — Frontend Client (Web)

Este es el cliente web de **Memo AI**, construido bajo el paradigma moderno de **Next.js 16 (App Router)** y **React 19**, diseñado para ofrecer una experiencia fluida, rápida y responsiva en el consumo de recursos de estudio generados por IA.

---

## 🛠️ Stack Tecnológico del Client

*   **Framework**: Next.js 16.x (con App Router & Server Components).
*   **UI/UX**: Tailwind CSS v4, Lucide React (Iconografía), Motion (Framer Motion - Micro-animaciones).
*   **Gestión de Formularios & Validación**: React Hook Form, Resolvers de Zod (`@hookform/resolvers`).
*   **Autenticación**: Integración de Cliente con `@repo/auth` (Better Auth).
*   **Parseo de Documentos**: `pdfjs-dist` (para lectura y preprocesamiento de documentos en el lado del cliente).
*   **Testing**: Playwright (E2E y pruebas de integración visuales/funcionales).

---

## 📁 Estructura del Proyecto

A continuación se detalla la distribución de responsabilidades en el cliente web:

```text
apps/web/
├── app/                  # Routing de Next.js (App Router) y Layouts de la aplicación
│   ├── (auth)/           # Rutas agrupadas para Login, Registro y Recuperación
│   ├── dashboard/        # Interfaz principal de control de documentos
│   ├── study/            # Visores interactivos de Flashcards y Quices
│   └── page.tsx          # Landing Page principal
├── components/           # Componentes UI locales y específicos del cliente web
├── hooks/                # Custom React Hooks (consumo de APIs, estados complejos)
├── lib/                  # Configuraciones, utilidades de cliente y wrappers
├── services/             # Abstracción de clientes HTTP y llamadas directas al Backend (NestJS)
└── tests/                # Cobertura de tests E2E escritos con Playwright
```

---

## 🔑 Integración de Autenticación (Better Auth)

La autenticación está centralizada a nivel monorepo en `@repo/auth` y se consume en el cliente mediante la configuración del archivo `middleware.ts`.

*   **Rutas Protegidas**: El middleware intercepta las peticiones dirigidas al `/dashboard`, `/study` u otras rutas privadas y valida la sesión activa redirigiendo automáticamente a `/login` si es necesario.
*   **Contexto de Sesión**: La sesión y los tokens se propagan automáticamente en las cabeceras de peticiones hacia el backend API.

---

## 🚀 Guía de Desarrollo y Ejecución Local

### 1. Requisitos del Entorno local
Asegúrate de configurar las siguientes variables de entorno en el archivo `apps/web/.env`:

```env
# URL base del Backend NestJS
NEXT_PUBLIC_API_URL="http://localhost:3000"

# URL base del cliente de autenticación (apunta al backend o proxy configurado)
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

### 2. Comandos de Consola de la Aplicación

Debes posicionar tu terminal en el directorio raíz o en `apps/web`:

*   **Levantar Servidor de Desarrollo**:
    ```bash
    # Desde la raíz del monorepo
    pnpm --filter web dev

    # Desde el directorio apps/web
    pnpm dev
    ```
    *Abre [http://localhost:3001](http://localhost:3001) para interactuar con la aplicación.*

*   **Verificar Estática de Tipos (TypeScript)**:
    ```bash
    pnpm check-types
    ```

*   **Lintear código**:
    ```bash
    pnpm lint
    ```

*   **Ejecutar Tests End-to-End (E2E) con Playwright**:
    ```bash
    # Ejecutar pruebas en segundo plano
    pnpm test

    # Abrir la UI interactiva de Playwright para depuración
    pnpm playwright test --ui
    ```

*   **Construir bundle de producción**:
    ```bash
    pnpm build
    ```
