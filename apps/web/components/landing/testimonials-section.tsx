import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'María García',
    role: 'Estudiante de Medicina',
    university: 'Universidad Complutense',
    content:
      'StudyFlow me ayudó a organizar todo el temario de anatomía. Las flashcards generadas automáticamente son increíbles.',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Estudiante de Derecho',
    university: 'UNAM',
    content:
      'Antes tardaba horas en hacer resúmenes. Ahora subo mis PDFs y tengo un roadmap de estudio en minutos. Aprobé todos mis parciales.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Estudiante de Ingeniería',
    university: 'Tecnológico de Monterrey',
    content:
      'El sistema de rachas me mantiene motivada. No he perdido un solo día de estudio en 3 semanas.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="text-lg text-muted-foreground">
            Miles de estudiantes ya están transformando su forma de estudiar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
