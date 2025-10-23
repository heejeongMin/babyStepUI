import { Checkbox } from "@/components/ui/checkbox";
import { ChecklistItem as ChecklistItemType } from "@shared/schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
}

export default function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-start gap-3 p-3 rounded-md hover-elevate" data-testid={`checklist-item-${item.id}`}>
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle(item.id)}
          className="mt-0.5"
          data-testid={`checkbox-${item.id}`}
        />
        <div className="flex-1 min-w-0">
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left group">
            <span className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
              {item.title}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
}
