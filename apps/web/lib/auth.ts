import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, authSchema } from "@repo/db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema
    }),
    emailAndPassword: {
        enabled: true
    },
    // Puedes agregar más proveedores aquí (Google, GitHub, etc.)
});
