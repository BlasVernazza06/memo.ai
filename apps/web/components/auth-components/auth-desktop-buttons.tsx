import Link from "next/link";

export default function AuthDesktopButtons() {
    return (
        <div className="flex items-center gap-4">
            <Link 
                href="/auth?authForm=login" 
                className="hover:bg-accent border border-transparent hover:border-accent-foreground/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
                Iniciar Sesión
            </Link>
            <Link 
                href="/auth?authForm=register" 
                className="bg-primary rounded-lg px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors duration-200"
            >
                Registrarse
            </Link>
        </div>
    );
}