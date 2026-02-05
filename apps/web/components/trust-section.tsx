'use client';

import { motion } from "motion/react";

const universities = [
  "Universidad Complutense",
  "UNAM",
  "UBA",
  "Tecnológico de Monterrey",
  "Universidad de Chile",
  "Universidad de Salamanca"
];

export default function TrustSection() {
    return (
        <section className="my-20">
            <div className="container mx-auto px-4">
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-sm text-muted-foreground mb-8"
                >
                Utilizado por más de <span className="font-semibold text-foreground">10,000+ estudiantes</span> de universidades como
                </motion.p>
                
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {universities.map((uni, index) => (
                        <motion.div 
                            key={uni} 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, color: "var(--foreground)" }}
                            className="text-muted-foreground/60 font-medium text-sm md:text-base transition-colors cursor-default"
                        >
                        {uni}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}