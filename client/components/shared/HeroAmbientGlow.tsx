import { cn } from "@/lib/utils";

interface HeroAmbientGlowProps {
  className?: string;
}

export function HeroAmbientGlow({ className }: HeroAmbientGlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-[0.12] pointer-events-none",
        className,
      )}
      aria-hidden
    >
      <div className="absolute top-0 start-0 w-72 h-72 bg-white rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" />
      <div className="absolute bottom-0 end-0 w-72 h-72 bg-secondary rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
    </div>
  );
}
