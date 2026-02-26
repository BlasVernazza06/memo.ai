import { db as defaultDb, authSchema } from "@repo/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const getAuthConfig = (options: { 
  db?: any;
  secret: string;
  baseURL: string;
  env: {
    googleClientId?: string; 
    googleClientSecret?: string;
    githubClientId?: string;
    githubClientSecret?: string;
  }
}) => ({
    secret: options.secret,
    baseURL: options.baseURL,
    database: drizzleAdapter(options.db || defaultDb, {
        provider: "pg",
        schema: authSchema
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: options.env.googleClientId || "",
            clientSecret: options.env.googleClientSecret || "",
        },
        github: {
            clientId: options.env.githubClientId || "",
            clientSecret: options.env.githubClientSecret || "",
        },
    },
});
