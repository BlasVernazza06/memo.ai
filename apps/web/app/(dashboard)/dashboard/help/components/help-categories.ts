import { Zap, Book, Brain, CreditCard, Shield, Youtube, LucideIcon } from "lucide-react";

export type HelpCategory = {
    slug: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    content: {
        title: string;
        text: string;
        sections: { subtitle: string; body: string }[];
    };
};

export const HELP_CATEGORIES: HelpCategory[] = [
    { 
        slug: "primeros-pasos",
        title: "Primeros Pasos", 
        desc: "Aprende lo básico para empezar a estudiar.", 
        icon: Zap, 
        color: "text-orange-500", 
        bg: "bg-orange-50",
        content: {
            title: "Guía de Inicio Rápido",
            text: "Bienvenido a Memo AI. Aquí aprenderás cómo transformar tus materiales de estudio en conocimiento real en pocos minutos.",
            sections: [
                { subtitle: "1. Crea tu primer Workspace", body: "Los Workspaces son contenedores temáticos. Puedes crear uno para 'Anatomía', 'Historia' o 'Programación'." },
                { subtitle: "2. Sube tus documentos", body: "Aceptamos PDF, imágenes de notas y hasta enlaces de YouTube. Nuestra IA procesará el contenido automáticamente." },
                { subtitle: "3. Interactúa con Memo", body: "Usa el chat para resolver dudas específicas o deja que Memo genere flashcards por ti." }
            ]
        }
    },
    { 
        slug: "workspaces",
        title: "Workspaces", 
        desc: "Cómo organizar tus materiales y carpetas.", 
        icon: Book, 
        color: "text-blue-500", 
        bg: "bg-blue-50",
        content: {
            title: "Dominando los Workspaces",
            text: "La organización es clave para un estudio efectivo. Los Workspaces te permiten separar contextos y prioridades.",
            sections: [
                { subtitle: "Organización Efectiva", body: "Usa categorías para filtrar tus espacios de trabajo. Puedes marcar tus favoritos para acceder más rápido." },
                { subtitle: "Personalización", body: "Cambia el icono, el color y añade una portada para identificar visualmente tus materias." },
                { subtitle: "Colaboración", body: "Próximamente podrás invitar a otros estudiantes a colaborar en tus Workspaces." }
            ]
        }
    },
    { 
        slug: "ia-y-flashcards",
        title: "IA y Flashcards", 
        desc: "Trucos para maximizar el aprendizaje.", 
        icon: Brain, 
        color: "text-purple-500", 
        bg: "bg-purple-50",
        content: {
            title: "El Poder de la IA",
            text: "Nuestra IA no solo resume, sino que entiende. Aprende a sacarle el máximo provecho.",
            sections: [
                { subtitle: "Generación Automática", body: "Al subir un archivo, Memo detecta los conceptos clave y crea flashcards de manera autónoma." },
                { subtitle: "Repetición Espaciada", body: "Usamos el algoritmo Anki para mostrarte las cartas justo antes de que las olvides." },
                { subtitle: "Personalización de IA", body: "Añade 'Contexto del Estudiante' para indicarle a Memo en qué temas debe enfocarse." }
            ]
        }
    },
    { 
        slug: "suscripcion",
        title: "Suscripción", 
        desc: "Pagos, facturación y beneficios Pro.", 
        icon: CreditCard, 
        color: "text-emerald-500", 
        bg: "bg-emerald-50",
        content: {
            title: "Planes y Beneficios",
            text: "Memo AI ofrece un plan gratuito generoso y un plan Pro para estudiantes de alto rendimiento.",
            sections: [
                { subtitle: "Cuenta Gratuita", body: "Incluye 3 Workspaces y hasta 10 documentos por mes." },
                { subtitle: "Beneficios Pro", body: "Workspaces ilimitados, archivos de hasta 100MB, OCR avanzado y prioridad en servidores." },
                { subtitle: "Gestión de Pagos", body: "Puedes cancelar o cambiar tu plan en cualquier momento desde la sección de Ajustes." }
            ]
        }
    },
    { 
        slug: "seguridad",
        title: "Seguridad", 
        desc: "Protección de datos y gestión de cuenta.", 
        icon: Shield, 
        color: "text-red-500", 
        bg: "bg-red-50",
        content: {
            title: "Privacidad de tus Datos",
            text: "Tu privacidad es nuestra prioridad. Tus documentos están cifrados y solo tú tienes acceso a ellos.",
            sections: [
                { subtitle: "Cifrado de Archivos", body: "Usamos estándares de grado bancario para proteger tus materiales de estudio." },
                { subtitle: "Privacidad de IA", body: "Tus datos no se utilizan para entrenar modelos públicos sin tu consentimiento explícito." },
                { subtitle: "Gestión de Cuenta", body: "Puedes descargar todos tus datos o eliminar tu cuenta permanentemente desde ajustes." }
            ]
        }
    }
];
