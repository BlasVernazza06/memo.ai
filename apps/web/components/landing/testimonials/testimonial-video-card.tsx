'use client';

import Image from 'next/image';

import { Play } from 'lucide-react';

import { Testimonial } from './testimonials-data';

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialVideoCard({ testimonial }: Props) {
  return (
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
  );
}
