import { cn } from "@/app/lib/utils";
import { ClassValue } from "clsx";

type H1Props = {
  children: React.ReactNode;
  className?: ClassValue;
};
export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={cn("text-3xl lg:text-6xl font-bold tracking-tight", className)}
    >
      {children}
    </h1>
  );
}
