import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface MilestoneCardProps {
  milestones: string[];
  tips: string[];
}

export default function MilestoneCard({ milestones, tips }: MilestoneCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card data-testid="card-milestones">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-chart-3" />
            Developmental Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {milestones.map((milestone, idx) => (
              <li key={idx} className="flex items-start gap-2" data-testid={`milestone-${idx}`}>
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm">{milestone}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card data-testid="card-tips">
        <CardHeader>
          <CardTitle>Helpful Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2" data-testid={`tip-${idx}`}>
                <Badge variant="secondary" className="mt-0.5 flex-shrink-0">
                  {idx + 1}
                </Badge>
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
