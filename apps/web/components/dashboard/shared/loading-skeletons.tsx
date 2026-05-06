import { Skeleton } from '@repo/ui/components/ui/skeleton';

export function ProfileLoading() {
  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* User Card Skeleton */}
        <div className="lg:w-1/3 bg-card border border-border rounded-4xl p-8 flex flex-col items-center text-center relative overflow-hidden">
          <Skeleton className="absolute top-0 left-0 w-full h-24 opacity-50" />
          <div className="relative mt-4">
            <Skeleton className="w-32 h-32 rounded-3xl" />
          </div>
          <div className="mt-6 space-y-3 w-full flex flex-col items-center">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/3 rounded-full mt-2" />
          </div>
          <Skeleton className="w-full h-12 rounded-2xl mt-8" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-4xl" />
          <Skeleton className="h-48 rounded-4xl" />
          <Skeleton className="h-48 rounded-4xl md:col-span-2" />
        </div>
      </div>

      {/* Activity Skeleton */}
      <div className="w-full space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-4xl" />
      </div>
    </div>
  );
}

export function SettingsLoading() {
  return (
    <div className="max-w-5xl mx-auto py-10 space-y-12 animate-in fade-in duration-500">
      <header className="space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </header>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Sidebar Skeleton */}
        <div className="lg:w-64 w-full flex lg:flex-col flex-row gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full lg:w-64 rounded-[1.25rem] shrink-0" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 w-full space-y-8">
          <div className="bg-card border border-border rounded-4xl p-8 space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <Skeleton className="h-12 w-32 rounded-xl mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HelpLoading() {
  return (
    <div className="max-w-6xl mx-auto py-6 space-y-12 animate-in fade-in duration-500">
      {/* Hero Skeleton */}
      <section className="text-center space-y-8 py-10 flex flex-col items-center">
        <div className="space-y-4 flex flex-col items-center w-full">
          <Skeleton className="h-8 w-40 rounded-2xl" />
          <Skeleton className="h-16 w-3/4 md:w-1/2" />
          <Skeleton className="h-6 w-2/3 md:w-1/3" />
        </div>
        <Skeleton className="h-16 w-full max-w-2xl rounded-3xl" />
      </section>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-48 rounded-4xl" />
        ))}
      </div>

      {/* Bottom Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-3xl" />
            <Skeleton className="h-32 w-full rounded-3xl" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-80 w-full rounded-4xl" />
          <Skeleton className="h-40 w-full rounded-4xl" />
        </div>
      </div>
    </div>
  );
}
