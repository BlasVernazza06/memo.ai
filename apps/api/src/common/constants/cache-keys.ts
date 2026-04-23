// apps/api/src/common/constants/cache-keys.ts

export const CACHE_KEYS = {
  // Usuarios
  USER_PROFILE: (userId: string) => `user:profile:${userId}`,

  // Workspaces
  WORKSPACES_LIST: (userId: string) => `workspaces:list:${userId}`,
  WORKSPACE: (userId: string, workspaceId: string) =>
    `userId:${userId}:workspace:v2:${workspaceId}`,

  // Planes y Billing (Nuevos)
  PLANS_LIST: 'plans:list',
  PLAN_SMART: (idOrPriceId: string) => `plan:smart:${idOrPriceId}`,
  PLAN_STRIPE: (stripePriceId: string) => `plan:stripe:${stripePriceId}`,

  GLOBAL_CONFIG: 'config:global',
} as const;
