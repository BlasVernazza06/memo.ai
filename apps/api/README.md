# 🎛️ Memo AI — API Gateway & Backend Engine (API)

Este servicio es el núcleo transaccional y la API Gateway de **Memo AI**, desarrollado con **NestJS v11** y **TypeScript**. Se encarga de la orquestación de flujos de negocio, autenticación, persistencia relacional en PostgreSQL y la integración con proveedores de servicios externos.

---

## 🛠️ Stack Tecnológico del Backend

*   **Framework**: NestJS v11 (con compilación SWC ultrarrápida).
*   **Base de Datos**: PostgreSQL utilizando Drizzle ORM y el driver `@neondatabase/serverless` para escalabilidad serverless.
*   **Autenticación**: Integración de Servidor con **Better Auth** (`@thallesp/nestjs-better-auth`).
*   **Gestión de Archivos**: AWS S3 SDK (Presigned URLs) y Uploadthing.
*   **Pasarela de Pago**: Stripe SDK para la gestión de suscripciones y facturación.
*   **Comunicaciones**: Brevo SDK (Envío transaccional de correos electrónicos).
*   **Validación y Tipos**: Zod junto a `nestjs-zod` y `class-validator`.
*   **Optimización**: Cache Manager integrado y Throttler para protección de tasa límite (Rate Limiting).
*   **Testing**: Jest y Supertest (E2E y unitarios).

---

## 📁 Estructura Arquitectónica

El backend sigue un patrón modular limpio y desacoplado:

```text
apps/api/src/
├── main.ts               # Punto de entrada de la aplicación NestJS
├── app.module.ts         # Módulo raíz que orquesta los submódulos globales
├── config/               # Configuraciones tipadas del sistema y variables de entorno
├── core/                 # Filtros globales de error, interceptores y guards de seguridad
├── common/               # Clases, decorators y utilidades compartidas
└── modules/              # Módulos encapsulados por dominio de negocio
    ├── auth/             # Módulo de integración de Better Auth
    ├── users/            # Gestión de cuentas de usuario y perfiles
    ├── documents/        # Subida, parseo y orquestación de archivos
    ├── study/            # Lógica y almacenamiento de flashcards y quices
    └── billing/          # Webhooks y suscripciones con Stripe
```

---

## 🔒 Seguridad e Integración de Autenticación

Toda la seguridad de rutas está controlada por Guards integrados que validan la sesión de Better Auth propagada por el cliente. Las cabeceras del protocolo se parsean automáticamente para inyectar la información del usuario autenticado en el contexto de ejecución.

---

## ⚙️ Guía de Inicio Rápido para Desarrollo

### 1. Variables de Entorno Requeridas (`apps/api/.env`)

Crea y configura las siguientes credenciales:

```env
PORT=3000

# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/memo_ai"

# URL del microservicio de Inteligencia Artificial (FastAPI)
AI_SERVICE_URL="http://localhost:8000"

# Configuración de Better Auth
BETTER_AUTH_SECRET="tu-secreto-compartido-de-32-caracteres"

# Pasarela de pagos (Stripe)
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Proveedor de correo (Brevo)
BREVO_API_KEY="xkeysib-..."

# Almacenamiento (AWS S3)
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_S3_BUCKET_NAME="memo-ai-documents"
```

### 2. Comandos de Consola del Backend

Ejecuta estos comandos desde la raíz del monorepo o dentro de `apps/api`:

*   **Levantar Servidor en Modo Watch (Desarrollo)**:
    ```bash
    pnpm dev
    ```

*   **Compilar el Código (Production ready)**:
    ```bash
    pnpm build
    ```

*   **Ejecutar Tests Unitarios (Jest)**:
    ```bash
    pnpm test
    ```

*   **Ejecutar Tests de Integración End-to-End (E2E)**:
    ```bash
    pnpm test:e2e
    ```

*   **Verificar Cobertura de Código**:
    ```bash
    pnpm test:cov
    ```

---

## 🔄 Flujo de Orquestación del Ingestion Pipeline

1.  **Presigned URL**: El cliente web solicita una URL de subida segura mediante el módulo de `documents`.
2.  **Carga S3**: El cliente sube el archivo directamente a AWS S3 o Uploadthing sin saturar el ancho de banda del backend.
3.  **Procesamiento**: El cliente notifica al módulo de `documents` la finalización de la carga. La API NestJS delega la extracción y procesamiento de lenguaje natural al microservicio Python.
4.  **Generación & Persistencia**: Los resultados estructurados son inyectados y creados en bloque a la base de datos a través de Drizzle ORM, aplicando transacciones atómicas para garantizar la integridad de los datos.
