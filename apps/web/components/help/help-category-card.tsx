import Link from "next/link";

import { LucideIcon, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HelpCategoryCardProps {
    title: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    slug: string;
    index: number;
}

export default function HelpCategoryCard({ title, desc, icon: Icon, color, bg, slug, index }: HelpCategoryCardProps) {
    return (
        <Link href={`/dashboard/help/${slug}`}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer h-full"
            >
                <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
                <div className="mt-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Leer más <ChevronRight className="w-4 h-4" />
                </div>
            </motion.div>
        </Link>
    );
}
