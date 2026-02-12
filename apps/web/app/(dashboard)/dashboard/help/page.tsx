'use client';

import { motion } from "motion/react";
import { 
    Search, 
    MessageCircle, 
    Book, 
    Zap, 
    Shield, 
    CreditCard, 
    LifeBuoy, 
    ExternalLink, 
    ChevronRight,
    Sparkles,
    Youtube,
    FileText,
    Brain,
    Mail
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

export default function HelpPage() {
    const categories = [
        { title: "Primeros Pasos", desc: "Aprende lo básico para empezar a estudiar.", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
        { title: "Workspaces", desc: "Cómo organizar tus materiales y carpetas.", icon: Book, color: "text-blue-500", bg: "bg-blue-50" },
        { title: "IA y Flashcards", desc: "Trucos para maximizar el aprendizaje con IA.", icon: Brain, color: "text-purple-500", bg: "bg-purple-50" },
        { title: "Suscripción", desc: "Pagos, facturación y beneficios Pro.", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50" },
        { title: "Seguridad", desc: "Protección de datos y gestión de cuenta.", icon: Shield, color: "text-red-500", bg: "bg-red-50" },
        { title: "Tutoriales", desc: "Videos cortos paso a paso.", icon: Youtube, color: "text-rose-500", bg: "bg-rose-50" },
    ];

    const faqs = [
        { q: "¿Cómo subo un PDF de más de 50MB?", a: "Los usuarios Pro pueden subir archivos de hasta 100MB. Si tu archivo es más grande, intenta dividirlo o comprimirlo." },
        { q: "¿La IA puede leer mis notas escritas a mano?", a: "Sí, siempre que el escaneo sea legible, nuestro motor de OCR puede procesar notas manuscritas en PDF." },
        { q: "¿Cómo comparto un Workspace con un compañero?", a: "Ve a la configuración del Workspace y selecciona 'Compartir'. Puedes invitar por email o generar un link público." },
    ];

    return (
        <div className="max-w-6xl mx-auto py-6 space-y-12">
            
            {/* Search Hero Section */}
            <section className="text-center space-y-8 py-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                        <LifeBuoy className="w-4 h-4" />
                        Centro de Ayuda
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        ¿Cómo podemos <span className="text-primary italic">ayudarte?</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                        Busca en nuestra base de conocimientos o explora las categorías para resolver tus dudas rápidamente.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto relative group"
                >
                    <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-white border border-slate-200 shadow-2xl rounded-[2rem] p-2 flex items-center">
                        <Search className="w-6 h-6 text-slate-400 ml-4" />
                        <Input 
                            placeholder="Ej: ¿Cómo crear flashcards?" 
                            className="border-none bg-transparent h-14 text-lg focus-visible:ring-0 placeholder:text-slate-300 font-medium flex-1 px-4"
                        />
                        <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 px-8 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                            Buscar
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
                    >
                        <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <cat.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{cat.desc}</p>
                        <div className="mt-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Leer más <ChevronRight className="w-4 h-4" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FAQs & Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <MessageCircle className="w-6 h-6 text-primary" />
                        Preguntas Frecuentes
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 hover:border-primary/20 transition-colors">
                                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            ¿Aún tienes dudas?
                        </h3>
                        <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                            Nuestro equipo de soporte está disponible 24/7 para ayudarte con lo que necesites.
                        </p>
                        <div className="space-y-3">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 flex gap-2">
                                <Mail className="w-4 h-4" />
                                Contactar Soporte
                            </Button>
                            <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl h-12 flex gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Comunidad Discord
                            </Button>
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-4xl p-8 space-y-4">
                        <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900">Estado del Sistema</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-tight">Todos los sistemas operativos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
