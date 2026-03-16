export type Workspace = {
  id: string | number;
  userId?: string;
  name: string;
  description?: string | null;
  customContext?: string | null;
  category?: string | null;
  icon?: string | null;
  coverImage?: string | null;
  isFavorite?: boolean;
  isArchived?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  // UI fields
  docs?: number;
  flashcards?: number;
  color?: string;
  lastActive?: string;
};
