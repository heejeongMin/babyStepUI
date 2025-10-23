import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface MonthCardProps {
  month: number;
  ageLabel: string;
  title: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  imageUrl?: string;
  onClick: () => void;
}

export default function MonthCard({
  month,
  ageLabel,
  title,
  description,
  completedTasks,
  totalTasks,
  imageUrl,
  onClick
}: MonthCardProps) {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer" onClick={onClick} data-testid={`card-month-${month}`}>
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border">
            {ageLabel}
          </Badge>
        </div>
      )}
      <CardHeader>
        {!imageUrl && (
          <Badge variant="secondary" className="w-fit mb-2">
            {ageLabel}
          </Badge>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium" data-testid={`text-progress-${month}`}>
              {completedTasks}/{totalTasks} ({percentage}%)
            </span>
          </div>
          <Progress value={percentage} />
        </div>
        <Button className="w-full" data-testid={`button-view-month-${month}`}>
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
