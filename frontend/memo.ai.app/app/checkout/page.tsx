'use client'
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, ShieldCheck, Lock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const plans = [
  {
    name: "Gratis",
    price: "0",
    description: "Para probar la magia",
    features: [
      "Hasta 1 PDFs al mes",
      "10 flashcards por documento",
      "Modo de estudio web",
      "Racha de estudio básica"
    ],
    cta: "Comenzar gratis",
    popular: false
  },
  {
    name: "Pro",
    price: "4.99",
    description: "Para aprobar exámenes",
    features: [
      "PDFs ilimitados",
      "Flashcards ilimitadas",
      "Exportar a Anki (.apkg)",
      "Modo Simulacro de Examen",
      "Estadísticas de progreso",
      "Soporte prioritario"
    ],
    cta: "Elegir Pro",
    popular: true
  },
  {
    name: "Equipo",
    price: "9.99",
    description: "Para grupos de estudio",
    features: [
      "Todo lo de Pro incluido",
      "Hasta 5 miembros",
      "Compartir mazos al instante",
      "Ranking competitivo grupal",
      "Gestión de roles"
    ],
    cta: "Crear grupo",
    popular: false
  }
];

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planParam = searchParams.get("plan") || "pro";

    const selectedPlan = plans.find((p) => p.name.toLowerCase() === planParam.toLowerCase());
    const plan = selectedPlan || plans[1];

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header Simulado */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/40">
                    <Link href="/" className="flex items-center gap-4 text-2xl font-bold tracking-tight text-slate-900">
                        <Image src="/logo.webp" alt="Memo.ai" width={50} height={50} />
                        Memo.ai
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-100/50 px-3 py-1 rounded-full">
                        <Lock className="w-3 h-3" />
                        Checkout Seguro SSL
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Columna Izquierda: Resumen del Pedido */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-border/60 overflow-hidden sticky top-8">
                            <div className="p-6 bg-slate-50/50 border-b border-border/60">
                                <h2 className="font-semibold text-lg">Resumen del pedido</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Plan Card */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Plan {plan.name}</h3>
                                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary">${plan.price}</div>
                                        <div className="text-xs text-muted-foreground">/mes</div>
                                    </div>
                                </div>

                                <div className="h-px bg-border/50" />

                                {/* Features */}
                                <div className="space-y-3">
                                    <p className="text-sm font-medium text-slate-700">Incluye:</p>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="h-px bg-border/50" />

                                {/* Total */}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-medium text-slate-900">Total a pagar hoy</span>
                                    <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                                </div>

                                <div className="bg-blue-50/50 rounded-lg p-3 flex gap-3 items-start text-xs text-blue-700">
                                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p>Garantía de devolución de 30 días. Cancela tu suscripción en cualquier momento desde el panel.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Stripe Embedded Checkout */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">Finalizar compra</h1>
                                <p className="text-muted-foreground">Serás redirigido al entorno seguro de Stripe para completar el pago.</p>
                            </div>

                            {/* Contenedor del Stripe Embedded Checkout */}
                            <div className="mt-8 border border-border rounded-xl bg-white p-8 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                                
                                {/* Aquí iría tu componente <EmbeddedCheckoutProvider> ... */}
                                
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center animate-pulse">
                                    <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-900">Cargando pasarela de pago...</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                                        Aquí se renderizará el formulario oficial de Stripe cuando integres la API Key.
                                    </p>
                                </div>
                            
                            </div>
                            
                            <div className="flex justify-center gap-4 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                                {/* Logos de confianza al pie */}
                                <div className="h-6 w-10 bg-slate-200 rounded" /> {/* Visa */}
                                <div className="h-6 w-10 bg-slate-200 rounded" /> {/* Mastercard */}
                                <div className="h-6 w-10 bg-slate-200 rounded" /> {/* Amex */}
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-32 bg-slate-200 rounded mb-4" />
                    <div className="h-4 w-48 bg-slate-200 rounded" />
                </div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}