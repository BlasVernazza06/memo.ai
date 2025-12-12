import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { AuthForm } from "./_components/auth-form";
import { Suspense } from "react";

export default function AuthPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            

            {/* Panel Izquierdo (Branding & Info) - Oculto en móvil */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-50 overflow-hidden items-center justify-center p-12">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-b from-blue-50/50 to-transparent pointer-events-none" />
                <div className="absolute -left-20 top-40 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-[80px]" />

                <div className="relative z-10 max-w-lg">
                    {/* Botón volver flotante (visible siempre) */}
                    <Link 
                        href="/" 
                        className="flex items-center mb-5 gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">Volver al inicio</span>
                    </Link>
                    {/* Logo Section */}    
                    <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <Image src="/logo-app.webp" alt="Memo.ai Logo" width={40} height={40} className="rounded-lg" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-800">Memo.ai</span>
                    </Link>
            
                    {/* Copy Section */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                            Transforma tu forma 
                            <span className="block text-primary">de estudiar</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Sube tus PDFs y deja que la IA cree tu roadmap de estudio personalizado con flashcards, quizzes y tareas inteligentes.
                        </p>
                    </div>
            
                    {/* Feature List */}
                    <div className="mt-12 space-y-5">
                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-blue-100/80 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-slate-700 font-medium">Análisis inteligente de documentos</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-purple-100/80 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-slate-700 font-medium">Flashcards automáticas y Roadmaps</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-orange-100/80 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                <Sparkles className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="text-slate-700 font-medium">Sistema de motivación gamificado</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel Derecho (Auth Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">
                 {/* Mobile logo visible only on small screens */}
                 <div className="lg:hidden absolute top-8 left-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo-app.webp" alt="Memo.ai Logo" width={32} height={32} className="rounded-md" />
                        <span className="font-bold text-lg">Memo.ai</span>
                    </Link>
                 </div>

                <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-muted/20 rounded-xl" />}>
                    <AuthForm />
                </Suspense>
            </div>
        </div>
    );
}