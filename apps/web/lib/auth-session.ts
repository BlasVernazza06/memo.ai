import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000";

export async function getSession() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    // Reenviar todas las cookies al backend para que Better Auth valide la sesión
    const cookieHeader = allCookies
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
            headers: {
                cookie: cookieHeader,
            },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data as {
            session: {
                id: string;
                userId: string;
                expiresAt: string;
                token: string;
            };
            user: {
                id: string;
                name: string;
                email: string;
                image: string | null;
                createdAt: string;
                updatedAt: string;
            };
        } | null;
    } catch {
        return null;
    }
}
