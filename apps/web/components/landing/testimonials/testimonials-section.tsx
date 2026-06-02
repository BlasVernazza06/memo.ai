'use client';

import { Star } from 'lucide-react';
import { motion } from 'motion/react';

import ChatIcon from '@/components/landing/testimonials/chat-icon';
import TestimonialCard from '@/components/landing/testimonials/testimonial-card';
import TestimonialVideoCard from '@/components/landing/testimonials/testimonial-video-card';
import { testimonials } from '@/components/landing/testimonials/testimonials-data';
import YoutubeIcon from '@/components/landing/testimonials/youtube-icon';

export default function TestimonialsSection() {
  return (
    <section
      className="py-32 bg-background relative overflow-x-clip"
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
          <ChatIcon />

          {/* Floating Element 2 (Right) - Enhanced 3D Youtube */}
          <YoutubeIcon />

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
                  <TestimonialVideoCard testimonial={testimonial} />
                ) : (
                  <TestimonialCard testimonial={testimonial} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
