import { ChecklistItem as ChecklistItemType } from "@shared/schema";
import ChecklistItem from "./ChecklistItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Blocks, TrendingUp, Moon, UtensilsCrossed, ShieldCheck } from "lucide-react";

interface CategorySectionProps {
  category: string;
  items: ChecklistItemType[];
  onToggleItem: (id: string) => void;
}

const categoryConfig = {
  supplements: { icon: Heart, label: "Supplements & Health", color: "text-chart-1" },
  play: { icon: Blocks, label: "Play Activities", color: "text-chart-2" },
  movement: { icon: TrendingUp, label: "Movement & Motor Skills", color: "text-chart-3" },
  sleep: { icon: Moon, label: "Sleep", color: "text-chart-4" },
  feeding: { icon: UtensilsCrossed, label: "Feeding", color: "text-chart-5" },
  safety: { icon: ShieldCheck, label: "Safety", color: "text-destructive" },
};

export default function CategorySection({ category, items, onToggleItem }: CategorySectionProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig];
  const Icon = config?.icon || Heart;
  const completed = items.filter(item => item.completed).length;
  const total = items.length;

  return (
    <Card data-testid={`category-${category}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${config?.color || 'text-primary'}`} />
          <CardTitle className="text-lg">{config?.label || category}</CardTitle>
        </div>
        <Badge variant="secondary" data-testid={`badge-progress-${category}`}>
          {completed}/{total}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item) => (
          <ChecklistItem key={item.id} item={item} onToggle={onToggleItem} />
        ))}
      </CardContent>
    </Card>
  );
}
