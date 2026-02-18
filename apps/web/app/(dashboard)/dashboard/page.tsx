import DashHero from "@/components/dashboard/dash-hero";
import DashWorkspacesSec from "@/components/dashboard/dash-workspaces-sec";
import { Workspace } from "@/components/dashboard/workspace-card";

const MOCK_WORKSPACES: Workspace[] = [
    { 
        id: "1", 
        userId: "user-1",
        name: "Anatomía Humana", 
        description: "Estudio del cuerpo",
        customContext: null,
        docs: 12, 
        flashcards: 145,
        color: "from-blue-500 to-indigo-600", 
        icon: 'book-open',
        lastActive: "hace 2 horas",
        isFavorite: true,
        isArchived: false,
        category: "Medicina",
        coverImage: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    { 
        id: "2", 
        userId: "user-1",
        name: "Marketing Digital", 
        description: "Marketing online",
        customContext: null,
        docs: 8, 
        flashcards: 64,
        color: "from-purple-500 to-pink-600", 
        icon: 'brain',
        lastActive: "hace 1 día",
        isFavorite: true,
        isArchived: false,
        category: "Negocios",
        coverImage: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    { 
        id: "3", 
        userId: "user-1",
        name: "Sistemas Operativos", 
        description: "SO y Kernels",
        customContext: null,
        docs: 15, 
        flashcards: 210,
        color: "from-emerald-500 to-teal-600", 
        icon: 'files',
        lastActive: "hace 3 días",
        isFavorite: false,
        isArchived: false,
        category: "Ingeniería",
        coverImage: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    { 
        id: "4", 
        userId: "user-1",
        name: "Historia del Arte", 
        description: "Arte mundial",
        customContext: null,
        docs: 5, 
        flashcards: 32,
        color: "from-orange-500 to-red-600", 
        icon: 'book-open',
        lastActive: "hace 1 semana",
        isFavorite: false,
        isArchived: false,
        category: "Humanidades",
        coverImage: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default async function DashboardPage() {
    // In the future, fetch from DB here:
    // const workspaces = await db.query.workspace.findMany();
    const workspaces = MOCK_WORKSPACES;

    return (
        <div className="space-y-12 py-6">
            {/* Dashboard Hero */}
            <DashHero />

            {/* Workspaces Section */}
            <DashWorkspacesSec initialWorkspaces={workspaces} />
        </div>
    );
}
