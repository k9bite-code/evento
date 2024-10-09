import { cn } from "@/app/lib/utils";
import { ClassValue } from "clsx";

type SkeletonProps = {
  className?: ClassValue;
};

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse h-4 w-[500px] rounded-md bg-white/5",
        className
      )}
    ></div>
  );
}
