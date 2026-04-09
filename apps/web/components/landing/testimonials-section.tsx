'use client';

import Image from 'next/image';

import { Play, Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Youtube } from 'svgl-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';

const testimonials = [
  {
    name: 'María García',
    role: 'Estudiante de Medicina',
    university: 'Universidad Complutense',
    content:
      'Memo.ai ha transformado por completo mi forma de entender la anatomía. Lo que antes me tomaba días, ahora lo proceso en una sola sesión de estudio altamente productiva.',
    rating: 5,
    type: 'text',
    size: 'large',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Abogado Jr.',
    university: 'UNAM',
    content:
      'La precisión de los roadmaps es sorprendente. Es como tener un tutor privado que conoce exactamente qué partes del código civil son más críticas.',
    rating: 5,
    type: 'text',
    size: 'small',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Ana Martínez',
    role: 'Ingeniera de Software',
    university: 'Tec de Monterrey',
    content:
      'Es la herramienta definitiva para estudiantes que buscamos la excelencia. El sistema de flashcards automáticas es simplemente inigualable.',
    rating: 5,
    type: 'text',
    size: 'small',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    name: 'Lucia Torres',
    role: 'Ingeniera de Software',
    university: 'Tec de Monterrey',
    content:
      'Es la herramienta definitiva para estudiantes que buscamos la excelencia. El sistema de flashcards automáticas es simplemente inigualable.',
    rating: 5,
    type: 'text',
    size: 'small',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    name: 'Daniela T.',
    role: 'Operations Manager',
    university: 'IE Business School',
    content:
      'Me encanta lo fácil que es crear y asignar temas. La interfaz hace que estudiar no sea algo abrumador, sino un proceso fluido y controlado.',
    rating: 5,
    type: 'text',
    size: 'small',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
  {
    name: 'Javier Pérez',
    role: 'Investigador de Postgrado',
    university: 'UBA',
    content:
      'Indispensable para mi tesis. La IA extrae referencias que yo mismo había pasado por alto. Un nivel de análisis asombroso.',
    rating: 5,
    type: 'video',
    size: 'medium',
    videoThumb:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=800&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="py-32 bg-background relative overflow-hidden"
      id="testimonials"
    >
      {/* Mesh Background for harmony */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-400/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6"
            >
              Feedback
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[0.95]">
              Personas como tú ya
              <br />
              <span className="text-primary italic">están usando memo.ai</span>
            </h2>
          </div>
          <div className="text-right hidden md:flex flex-col items-end">
            <div className="flex gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-[10px] font-black text-muted-foreground tracking-[0.2em] uppercase">
              Media 4.9/5 · +5,000 Usuarios
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="relative">
          {/* Floating Element 1 (Left) - Enhanced 3D Chat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1 },
              x: { duration: 1 },
              y: {
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              },
            }}
            className="absolute -left-12 top-1/4 z-20 hidden xl:block"
          >
            <div className="w-16 h-16 -rotate-12 rounded-[1.5rem] bg-white dark:bg-zinc-800 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-700 flex items-center justify-center relative overflow-visible group">
              {/* Custom 3D-like Chat SVG */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="chatGradient"
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <path
                  d="M34 16C34 23.1797 27.732 29 20 29C18.6677 29 17.3879 28.8273 16.2001 28.5L10 32V25.5C7.54581 23.3662 6 20.3701 6 17C6 9.8203 12.268 4 20 4C27.732 4 34 9.8203 34 16Z"
                  fill="url(#chatGradient)"
                />
                <rect
                  x="13"
                  y="14"
                  width="14"
                  height="2.5"
                  rx="1.25"
                  fill="white"
                  fillOpacity="0.4"
                />
                <rect
                  x="13"
                  y="19"
                  width="8"
                  height="2.5"
                  rx="1.25"
                  fill="white"
                  fillOpacity="0.4"
                />
              </svg>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-zinc-800 shadow-sm animate-pulse" />
            </div>
          </motion.div>

          {/* Floating Element 2 (Right) - Enhanced 3D Youtube */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1 },
              x: { duration: 1 },
              y: {
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              },
            }}
            className="absolute -right-6 bottom-6 z-20 hidden xl:block"
          >
            <div className="w-16 h-16 rotate-12 rounded-[1.5rem] bg-white dark:bg-zinc-800 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-700 flex items-center justify-center group overflow-visible">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="ytGradient"
                    x1="0"
                    y1="0"
                    x2="42"
                    y2="42"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF4B4B" />
                    <stop offset="1" stopColor="#D40000" />
                  </linearGradient>
                </defs>
                <rect
                  x="2"
                  y="7"
                  width="38"
                  height="28"
                  rx="8"
                  fill="url(#ytGradient)"
                />
                <path
                  d="M28 21L17 27.35V14.65L28 21Z"
                  fill="white"
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
                />
              </svg>
            </div>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`break-inside-avoid relative group`}
              >
                {testimonial.type === 'video' ? (
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-muted shadow-2xl border border-border">
                    <Image
                      src={testimonial.videoThumb || ''}
                      alt={testimonial.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-9 h-9 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/20 transition-colors">
                        Ver video review
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 rounded-[3rem] bg-card border border-border shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] dark:hover:bg-zinc-900/50 transition-all duration-500 flex flex-col items-start gap-8">
                    <Quote className="w-8 h-8 text-primary/10 absolute top-10 right-10" />

                    <p
                      className={`text-muted-foreground font-medium leading-relaxed ${
                        testimonial.size === 'large' ? 'text-xl' : 'text-[15px]'
                      }`}
                    >
                      &quot;{testimonial.content}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 rounded-2xl border-2 border-background shadow-sm">
                        <AvatarImage
                          src={testimonial.avatar}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                          {testimonial.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-foreground text-sm tracking-tight">
                            {testimonial.name}
                          </p>
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
