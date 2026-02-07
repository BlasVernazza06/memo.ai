'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Mail, Lock, FileText, Youtube, MessageSquare, BookOpen, Sparkles, Link as LinkIcon } from "lucide-react";
import OAuthButtons from "../components/oauth-buttons";
import { loginSchema, type LoginFormValues } from "@repo/validators/auth";


export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login data:", data);
        // Aquí iría la integración con better-auth
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[700px]">
                
                {/* Left Side: Login Form */}
                <div className="flex-1 p-8 md:p-16 flex flex-col font-sans">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src="/logo.webp" alt="Memo.ai" width={32} height={32} className="rounded-lg" />
                            <span className="text-xl font-bold tracking-tight">memo<span className="text-primary">.ai</span></span>
                        </Link>
                    </motion.div>

                    <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/30 relative">
                                <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse" />
                                <Lock className="w-6 h-6 text-white relative z-10" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1C1E]">¡Accede a tu cuenta!</h1>
                            <p className="text-muted-foreground mt-2 text-sm font-medium">Entra con tu email y contraseña registrada para continuar.</p>
                        </motion.div>

                        <motion.form 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-5" 
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider">Email</Label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    </div>
                                    <Input 
                                        id="email"
                                        type="email" 
                                        {...register("email")}
                                        placeholder="ej. blas@memo.ai" 
                                        className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                                    />
                                </div>
                                {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" className="text-xs font-bold text-[#4A4C4E] uppercase tracking-wider">Contraseña</Label>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    </div>
                                    <Input 
                                        id="password"
                                        type="password" 
                                        {...register("password")}
                                        placeholder="••••••••••••" 
                                        className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                                    />
                                </div>
                                {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.password.message}</p>}
                            </div>

                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" {...register("rememberMe")} className="w-4 h-4 rounded border-[#E2E8F0] text-primary focus:ring-primary/20 accent-primary cursor-pointer" />
                                    <span className="text-[13px] text-muted-foreground group-hover:text-foreground transition-colors font-medium">Recuérdame</span>
                                </label>
                                <Link href="#" className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98]">
                                Iniciar Sesión
                            </Button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#E2E8F0]" />
                                </div>
                                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <span className="bg-white px-4">O inicia con</span>
                                </div>
                            </div>

                            <OAuthButtons />
                        </motion.form>
                        
                        <div className="mt-8 text-center pt-4 border-t border-[#F1F5F9]">
                            <p className="text-sm text-muted-foreground font-medium">
                                ¿No tienes una cuenta?{" "}
                                <Link href="/auth/register" className="text-primary font-bold hover:underline transition-all">
                                    Crea una aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual Panel */}
                <div className="hidden md:flex w-[45%] bg-[#EBF4FF] p-12 flex-col justify-between relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl shadow-inner" />

                    <div className="relative z-10 text-center space-y-3">
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
                            Estudia mejor <span className="text-primary">en cualquier lugar</span>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">
                            Tu biblioteca de conocimiento potenciada por IA vive donde tú estés.
                        </p>
                    </div>

                    {/* Orbit Visualization */}
                    <div className="relative flex items-center justify-center h-full">
                        {/* Orbit rings */}
                        <div className="absolute w-[280px] h-[280px] border border-primary/10 rounded-full" />
                        <div className="absolute w-[180px] h-[180px] border border-primary/20 rounded-full" />
                        
                        {/* Central Logo */}
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center p-5 border border-primary/5 shadow-primary/10"
                        >
                            <Image src="/logo.webp" alt="Memo Logo" width={60} height={60} className="rounded-xl" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </motion.div>

                        {/* Orbiting Icons */}
                        {[
                            { icon: FileText, delay: 0, radius: 140, color: "text-blue-500", label: "PDFs" },
                            { icon: Youtube, delay: 1, radius: 140, color: "text-red-500", label: "YouTube" },
                            { icon: BookOpen, delay: 2, radius: 140, color: "text-green-500", label: "Libros" },
                            { icon: MessageSquare, delay: 0.5, radius: 90, color: "text-purple-500", label: "IA" },
                            { icon: LinkIcon, delay: 1.5, radius: 90, color: "text-amber-500", label: "Web" },
                        ].map((item, idx) => {
                            return (
                                <motion.div
                                    key={idx}
                                    animate={{ 
                                        rotate: [0, 360] 
                                    }}
                                    transition={{ 
                                        duration: 20 + idx * 5, 
                                        repeat: Infinity, 
                                        ease: "linear"
                                    }}
                                    className="absolute"
                                    style={{ 
                                        width: item.radius * 2, 
                                        height: item.radius * 2 
                                    }}
                                >
                                    <motion.div 
                                        className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-100 group"
                                        animate={{ rotate: [0, -360] }}
                                        transition={{ 
                                            duration: 20 + idx * 5, 
                                            repeat: Infinity, 
                                            ease: "linear"
                                        }}
                                    >
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                        <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[9px] font-bold px-2 py-1 rounded-md shadow-sm border border-slate-100">
                                            {item.label}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="relative z-10">
                        <p className="text-[#64748B] text-xs font-semibold text-center italic opacity-80 leading-relaxed">
                            Compatible con <span className="text-slate-900">PDFs, YouTube, Notion</span> y las <br />
                            principales plataformas para una experiencia fluida.
                        </p>
                        
                        {/* Page dots indicator (visual only) */}
                        <div className="flex gap-1.5 justify-center mt-6">
                            <div className="w-6 h-1 bg-primary rounded-full" />
                            <div className="w-2 h-1 bg-primary/20 rounded-full" />
                            <div className="w-2 h-1 bg-primary/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
