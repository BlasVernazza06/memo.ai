'use client';

import { use } from "react";
import { HELP_CATEGORIES } from "../components/help-categories";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { ChevronLeft, ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";

export default function HelpCategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const category = HELP_CATEGORIES.find(cat => cat.slug === slug);

    if (!category) {
        notFound();
    }

    const Icon = category.icon;

    return (
        <div className="max-w-4xl mx-auto py-8 space-y-10 px-4">
            {/* Nav Back */}
            <Link 
                href="/dashboard/help" 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors mb-4 group"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver al Centro de Ayuda
            </Link>

            {/* Header */}
            <section className="space-y-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-20 h-20 ${category.bg} ${category.color} rounded-3xl flex items-center justify-center shadow-xl shadow-current/5`}
                >
                    <Icon className="w-10 h-10" />
                </motion.div>
                
                <div className="space-y-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
                    >
                        {category.content.title}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl"
                    >
                        {category.content.text}
                    </motion.p>
                </div>
            </section>

            {/* Content Body */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 gap-8 pt-6"
            >
                {category.content.sections.map((section, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-4xl p-8 hover:border-primary/20 transition-all shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-[12px] font-black text-slate-400">
                                {idx + 1}
                            </span>
                            {section.subtitle}
                        </h3>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            {section.body}
                        </p>
                    </div>
                ))}
            </motion.div>

            {/* Pro Tip Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary/5 border border-primary/20 rounded-4xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Lightbulb className="w-32 h-32 text-primary" />
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-900">Pro Tip de Memo</h4>
                    <p className="text-slate-600 text-sm font-medium">
                        ¿Sabías que puedes arrastrar y soltar múltiples archivos a la vez en cualquier Workspace? Memo los organizará por ti.
                    </p>
                </div>
                <Button className="bg-primary text-white font-bold rounded-2xl h-12 flex gap-2 ml-auto shadow-lg shadow-primary/20">
                    Ir a mis Workspaces
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </motion.div>

            {/* CTA Footer */}
            <div className="pt-10 text-center border-t border-slate-100">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">¿Te sirvió esta información?</p>
                <div className="flex items-center justify-center gap-4">
                    <Button variant="ghost" className="rounded-2xl h-12 px-8 font-bold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50">Sí, fue útil</Button>
                    <Button variant="ghost" className="rounded-2xl h-12 px-8 font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50">No, necesito ayuda</Button>
                </div>
            </div>
        </div>
    );
}
