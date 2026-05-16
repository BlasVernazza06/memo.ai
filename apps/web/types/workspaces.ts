import { LucideIcon } from 'lucide-react';

export type Workspace = {
  id: string | number;
  userId?: string;
  name: string;
  description?: string | null;
  customContext?: string | null;
  category?: string | null;
  icon?: string | null;
  bgColor?: string | null;
  isFavorite?: boolean;
  isArchived?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  // UI fields
  docs?: number;
  flashcards?: number;
  quizzesCount?: number;
  color?: string;
  lastActive?: string;
};

export type TabData = {
  id: string;
  label: string;
  icon: LucideIcon;
  count: number | null;
  canGenerate?: boolean;
};
