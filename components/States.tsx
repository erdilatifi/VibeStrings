"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingList({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={`loading-skeleton-${count}-${i}`} className="rounded-2xl border p-4 space-y-3">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState() {
  return <p className="text-destructive">{("error")}</p>;
}

export function EmptyState() {
  return <p className="opacity-70">{("empty")}</p>;
}
