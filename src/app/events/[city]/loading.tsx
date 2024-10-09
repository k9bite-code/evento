import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap justify-center max-w-[1000px] mx-auto px-[20px] py-24 gap-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
