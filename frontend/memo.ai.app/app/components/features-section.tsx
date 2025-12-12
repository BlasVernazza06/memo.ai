'use client';

import { Sparkles, Brain, Wand2, Shield } from "lucide-react";
import { motion } from "motion/react";

const features = [
    {
        title: "Inteligencia Artificial",
        description: "Utilizamos la última tecnología de IA para analizar tus documentos y generar contenido de estudio de alta calidad al instante.",
        icon: Brain,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "group-hover:border-blue-500/20"
    },
    {
        title: "Personalización Total",
        description: "El sistema aprende de tu estilo de aprendizaje y adapta las preguntas y resúmenes para maximizar tu retención.",
        icon: Wand2,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "group-hover:border-purple-500/20"
    },
    {
        title: "Seguridad y Privacidad",
        description: "Tus documentos son procesados de forma segura y nunca compartimos tus datos. Tu privacidad es nuestra prioridad.",
        icon: Shield,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        borderColor: "group-hover:border-green-500/20"
    },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center mb-6 gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1"
                    >
                        <Sparkles className="w-4 h-4 text-primary"/>
                        <span className="text-sm font-medium text-primary">Características</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
                    >
                        Todo lo que necesitas para <span className="text-primary">aprobar</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl"
                    >
                        Memo.ai transforma tus apuntes aburridos en herramientas de estudio dinámicas y efectivas.
                    </motion.p>
                </div>
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group bg-card hover:bg-card/50 border border-border/50 hover:border-border px-8 py-6 rounded-2xl transition-all duration-300 hover:shadow-lg"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 transition-colors duration-300`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}