import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2" data-testid="progress-bar">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {label || "Progress"}
        </span>
        <span className="font-medium" data-testid="text-progress">
          {current} of {total} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} data-testid="progress-indicator" />
    </div>
  );
}
