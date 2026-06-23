import { cn } from "@/lib/utils";
import type { IconType } from "@/types";
import type { TimelineStepState } from "./orderTimeline.utils";

type OrderStatusStepProps = {
  icon: IconType;
  stepState: TimelineStepState;
  title: string;
  description: string;
  date: string;
  showConnector?: boolean;
  connectorActive?: boolean;
  tone?: "default" | "danger";
};

export function OrderStatusStep({
  icon: Icon,
  stepState,
  title,
  description,
  date,
  showConnector = false,
  connectorActive = false,
  tone = "default",
}: OrderStatusStepProps) {
  const isReached = stepState === "completed" || stepState === "current";
  const isDanger = tone === "danger" && isReached;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            isDanger
              ? "bg-red-50 text-red-600 ring-2 ring-red-100"
              : isReached
                ? "bg-secondary text-primary ring-2 ring-primary/10"
                : "bg-gray-100 text-content-tertiary",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {showConnector && (
          <div
            className={cn(
              "w-0.5 flex-1 min-h-14 mt-2",
              connectorActive
                ? "bg-primary/25"
                : "border-l-2 border-dashed border-gray-200",
            )}
          />
        )}
      </div>

      <div className={cn("flex flex-col pb-2", showConnector && "pb-8")}>
        <span
          className={cn(
            "text-base font-semibold",
            isDanger
              ? "text-red-600"
              : isReached
                ? "text-content-primary"
                : "text-content-tertiary",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "text-sm",
            isReached ? "text-content-tertiary" : "text-content-tertiary/70",
          )}
        >
          {description}
        </span>
        <span
          className={cn(
            "text-sm mt-1",
            isReached ? "text-content-tertiary" : "text-content-tertiary/60",
          )}
        >
          {date}
        </span>
      </div>
    </div>
  );
}
