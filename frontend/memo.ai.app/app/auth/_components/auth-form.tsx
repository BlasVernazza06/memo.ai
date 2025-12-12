"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

const registerSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

export function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authMode = searchParams.get("authForm")
  
  // Derived state: URL is the source of truth
  const isLogin = authMode !== "register"
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "", 
    },
  })

  // Reset form when mode changes
  useEffect(() => {
    form.reset()
  }, [isLogin, form])

  const switchMode = (mode: boolean) => {
    const newMode = mode ? "login" : "register"
    router.replace(`?authForm=${newMode}`, { scroll: false })
  }

  const onSubmit = (data: LoginFormValues | RegisterFormValues) => {
    console.log(data)
    // Aquí irían las Server Actions
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
        </h2>
        <p className="text-muted-foreground">
          {isLogin 
            ? "Ingresa tus credenciales para continuar" 
            : "Regístrate para comenzar a estudiar mejor"}
        </p>
      </div>

      {/* Switch */}
      <div className="bg-muted/50 p-1 rounded-xl flex mb-8 relative">
        <div 
            className="absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out"
            style={{ 
                left: isLogin ? '4px' : 'calc(50% + 0px)',
                width: 'calc(50% - 4px)'
            }}
        />
        <button
          onClick={() => switchMode(true)}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg relative z-10 transition-colors duration-200 ${
            isLogin ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => switchMode(false)}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg relative z-10 transition-colors duration-200 ${
            !isLogin ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
          }`}
        >
          Registrarse
        </button>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            {...form.register("email")}
            className="rounded-xl h-11 bg-background/50"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive mt-1 font-medium">
              {form.formState.errors.email.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...form.register("password")}
              className="rounded-xl h-11 bg-background/50 pr-10"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-destructive mt-1 font-medium">
              {form.formState.errors.password.message as string}
            </p>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pb-1">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...form.register("confirmPassword")}
                  className="rounded-xl h-11 bg-background/50"
                />
                {(form.formState.errors as any).confirmPassword && (
                    <p className="text-xs text-destructive mt-1 font-medium">
                    {(form.formState.errors as any).confirmPassword.message as string}
                    </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLogin && (
          <div className="flex justify-end">
            <Link 
              href="#" 
              className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        )}

        <Button 
            type="submit" 
            className="w-full h-11 rounded-xl font-medium text-base mt-2"
        >
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <button 
            type="button"
            onClick={() => switchMode(!isLogin)}
            className="font-medium text-primary hover:underline underline-offset-4"
        >
            {isLogin ? "Regístrate" : "Inicia sesión"}
        </button>
      </div>
    </div>
  )
}
