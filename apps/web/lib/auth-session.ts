import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.API_URL || "http://127.0.0.1:3000";

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export async function getSession() {
    // Si no hay cookies, evitamos el fetch
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    if (allCookies.length === 0) return null;

    const cookieHeader = allCookies
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const url = `${API_URL}/api/auth/get-session`;
    console.log("[auth-session] Fetching:", url);

    try {
        const res = await fetch(`${API_URL}/api/auth/get-session`, {
            headers: {
                cookie: cookieHeader,
            },
            cache: "no-store",
        });

        console.log("[auth-session] Response status:", res.status);

        if (!res.ok) return null;

        const data = await res.json();
        console.log("[auth-session] Data:", JSON.stringify(data));
        return data as {
            session: {
                id: string;
                userId: string;
                expiresAt: string;
                token: string;
            };
            user: SessionUser;
        } | null;
    } catch (err) {
        console.error("[auth-session] Error:", err);
        return null;
    }
}
