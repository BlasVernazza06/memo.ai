'use client';

import { useState } from "react";

import { Mail, Lock, User, EyeOff, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import { registerSchema, type RegisterFormValues } from "@repo/validators";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import OAuthButtons from "@/components/auth/oauth-buttons";

export default function SignUpForm() {
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (formData: RegisterFormValues) => {
        setIsLoadingForm(true);

        try {
            await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
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
            transition={{ delay: 0.1 }}
            className="space-y-4" 
            onSubmit={handleSubmit(onSubmit, (errors) => console.log("Errores de validación:", errors))}
        >
            <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider">Nombre Completo</Label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    </div>
                    <Input 
                        id="name"
                        type="text" 
                        {...register("name")}
                        placeholder="Tu nombre" 
                        className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                    />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.name.message}</p>}
            </div>

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
                        placeholder="tu@email.com" 
                        className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                    />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider">Contraseña</Label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    </div>
                    <Input 
                        id="password"
                        type={showPassword ? "text" : "password"} 
                        {...register("password")}
                        placeholder="Mínimo 8 caracteres" 
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

            <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider">Confirmar Contraseña</Label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    </div>
                    <Input 
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"} 
                        {...register("confirmPassword")}
                        placeholder="Mínimo 8 caracteres" 
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98] mt-2">
                {isLoadingForm ? "Creando Cuenta..." : "Crear Cuenta Gratuita"}
            </Button>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#E2E8F0]" />
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="bg-white px-4">O regístrate con</span>
                </div>
            </div>

            <OAuthButtons />
        </motion.form>
    );
}