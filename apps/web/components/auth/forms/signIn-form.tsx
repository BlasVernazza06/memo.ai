'use client';

import { useState } from "react";

import Link from "next/link";

import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@repo/auth/client";
import { loginSchema, type LoginFormValues } from "@repo/validators";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import OAuthButtons from "@/components/auth/oauth-buttons";

export default function SignInForm() {
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (formData: LoginFormValues) => {
        setIsLoadingForm(true)
        try {
            await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingForm(false);
        }
    };

    return (
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
                        type={showPassword ? "text" : "password"} 
                        {...register("password")}
                        placeholder="••••••••••••" 
                        className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 pr-10 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
                    >
                        {showPassword ? 
                            <Eye className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            : 
                            <EyeOff className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        }
                    </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between px-1">
                <Link href="#" className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98]">
                {isLoadingForm ? <Loader className="size-4"/> : "Iniciar Sesión"}
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
    );
}