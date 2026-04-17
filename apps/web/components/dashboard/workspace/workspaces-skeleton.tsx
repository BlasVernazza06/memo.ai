import { Skeleton } from '@repo/ui/components/ui/skeleton';

export default function WorkspacesSkeleton() {
  return (
    <section className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <Skeleton className="h-12 flex-1 w-full rounded-2xl" />
          <div className="flex gap-2 p-1 bg-white border border-slate-100 rounded-2xl w-full md:w-auto">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Create New Card Skeleton */}
        <div className="border-2 border-dashed border-slate-100 rounded-4xl p-8 flex flex-col items-center justify-center min-h-[380px]">
          <Skeleton className="w-16 h-16 rounded-3xl mb-4" />
          <Skeleton className="h-5 w-32 rounded-lg mb-2" />
          <Skeleton className="h-3 w-48 rounded-lg" />
        </div>

        {/* Workspace Card Skeletons */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 rounded-4xl overflow-hidden min-h-[380px] flex flex-col"
          >
            <Skeleton className="h-40 w-full" />
            <div className="p-6 space-y-6 flex-1 flex flex-col">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <div className="space-y-2 flex-1 pt-1">
                    <Skeleton className="h-5 w-3/4 rounded-lg" />
                    <Skeleton className="h-3 w-1/2 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
