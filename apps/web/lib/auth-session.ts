import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000";

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export async function getSession() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const cookieHeader = allCookies
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    console.log("[auth-session] URL:", `${API_URL}/api/auth/get-session`);
    console.log("[auth-session] Cookies:", cookieHeader);

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
