// La instancia de betterAuth (servidor) solo vive en la API NestJS (apps/api).
// El frontend web solo necesita el authClient (cliente) desde @repo/auth/client.
// Este archivo se mantiene como re-export por compatibilidad.
export { authClient } from "@repo/auth/client";
