import Link from 'next/link';

import { Layers, Plus } from 'lucide-react';

import { Workspace } from '../../../../components/dashboard/workspace-card';
import WorkspacesClient from '../../../../components/dashboard/workspaces-client';

// Mock data logic remains here for now, or move to a separate data file/API call
const MOCK_WORKSPACES: Workspace[] = [
  {
    id: '1',
    userId: 'user-1',
    name: 'Anatomía Humana',
    description: 'Estudio del cuerpo',
    customContext: null,
    docs: 12,
    flashcards: 145,
    color: 'from-blue-500 to-indigo-600',
    icon: 'book-open',
    lastActive: 'hace 2 horas',
    isFavorite: true,
    isArchived: false,
    category: 'Medicina',
    coverImage:
      'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user-1',
    name: 'Marketing Digital',
    description: 'Marketing online',
    customContext: null,
    docs: 8,
    flashcards: 64,
    color: 'from-purple-500 to-pink-600',
    icon: 'brain',
    lastActive: 'hace 1 día',
    isFavorite: true,
    isArchived: false,
    category: 'Negocios',
    coverImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: 'user-1',
    name: 'Sistemas Operativos',
    description: 'SO y Kernels',
    customContext: null,
    docs: 15,
    flashcards: 210,
    color: 'from-emerald-500 to-teal-600',
    icon: 'files',
    lastActive: 'hace 3 días',
    isFavorite: false,
    isArchived: false,
    category: 'Ingeniería',
    coverImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    userId: 'user-1',
    name: 'Historia del Arte',
    description: 'Arte mundial',
    customContext: null,
    docs: 5,
    flashcards: 32,
    color: 'from-orange-500 to-red-600',
    icon: 'book-open',
    lastActive: 'hace 1 semana',
    isFavorite: false,
    isArchived: false,
    category: 'Humanidades',
    coverImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default async function WorkspacesPage() {
  // In the future, fetch from DB here:
  // const workspaces = await db.query.workspace.findMany();
  const workspaces = MOCK_WORKSPACES;

  return (
    <div className="space-y-10 py-6">
      <WorkspacesHeader />
      <WorkspacesClient initialWorkspaces={workspaces} />
    </div>
  );
}

function WorkspacesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Mis Workspaces
          </h1>
        </div>
        <p className="text-slate-500 font-medium">
          Gestiona y organiza tus áreas de estudio inteligentes.
        </p>
      </div>

      <Link
        href="/dashboard/workspaces/new"
        className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all w-full md:w-auto"
      >
        <Plus className="w-6 h-6" />
        Crear Nuevo
      </Link>
    </div>
  );
}
