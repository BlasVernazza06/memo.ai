import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Quote } from 'lucide-react';

import { Testimonial } from './testimonials-data';

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  // Cycle card marker colors for tactile variety
  const cardColor = testimonial.size === 'large' ? 'paper-card-blue' : 'paper-card-yellow';

  return (
    <div className={`p-8 rounded-xl bg-card border border-border/50 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col items-start gap-8 relative overflow-hidden z-10 paper-card ${cardColor} blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br select-none`}>
      <Quote className="w-8 h-8 text-primary/5 absolute top-8 right-8" />

      <p
        className={`text-foreground/90 font-serif italic leading-relaxed relative z-10 ${
          testimonial.size === 'large' ? 'text-lg md:text-xl font-normal' : 'text-sm md:text-base font-normal'
        }`}
      >
        &quot;{testimonial.content}&quot;
      </p>

      <div className="flex items-center gap-4 relative z-10">
        <Avatar className="w-10 h-10 rounded-lg ring-2 ring-primary/10 border border-background shadow-xs overflow-hidden">
          <AvatarImage src={testimonial.avatar} className="object-cover" />
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
          <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest mt-0.5">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
