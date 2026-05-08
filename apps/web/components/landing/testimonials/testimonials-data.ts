export interface Testimonial {
  name: string;
  role: string;
  university: string;
  content: string;
  rating: number;
  type: 'text' | 'video';
  size: 'small' | 'medium' | 'large';
  avatar: string;
  videoThumb?: string;
}

export const testimonials: Testimonial[] = [
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
