import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MonthTimelineProps {
  selectedMonth: number;
  availableMonths: number[];
  onSelectMonth: (month: number) => void;
}

export default function MonthTimeline({ selectedMonth, availableMonths, onSelectMonth }: MonthTimelineProps) {
  const getMonthLabel = (month: number) => {
    if (month === 0) return "Newborn";
    if (month === 1) return "1 mo";
    return `${month} mo`;
  };

  return (
    <ScrollArea className="w-full" data-testid="month-timeline">
      <div className="flex gap-2 p-1">
        {availableMonths.map((month) => (
          <Button
            key={month}
            variant={selectedMonth === month ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectMonth(month)}
            className="flex-shrink-0"
            data-testid={`button-month-${month}`}
          >
            {getMonthLabel(month)}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
