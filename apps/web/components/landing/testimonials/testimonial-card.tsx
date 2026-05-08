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
  return (
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
          <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
