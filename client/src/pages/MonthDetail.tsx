import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressBar from "@/components/ProgressBar";
import CategorySection from "@/components/CategorySection";
import MilestoneCard from "@/components/MilestoneCard";
import MonthTimeline from "@/components/MonthTimeline";
import { getMonthData, getAllMonths } from "@/lib/monthData";
import { ChecklistItem as ChecklistItemType } from "@shared/schema";
import { ArrowLeft, Baby } from "lucide-react";

interface MonthDetailProps {
  initialMonth: number;
  onNavigateBack: () => void;
}

export default function MonthDetail({ initialMonth, onNavigateBack }: MonthDetailProps) {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [checklists, setChecklists] = useState<ChecklistItemType[]>([]);

  const monthData = getMonthData(selectedMonth);
  const availableMonths = getAllMonths();

  useEffect(() => {
    const data = getMonthData(selectedMonth);
    if (data) {
      setChecklists(data.checklists);
    }
  }, [selectedMonth]);

  if (!monthData) {
    return <div>Month not found</div>;
  }

  const handleToggleItem = (id: string) => {
    setChecklists(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getCategoryItems = (category: string) => {
    return checklists.filter(item => item.category === category);
  };

  const categories = Array.from(new Set(checklists.map(item => item.category)));
  const completedCount = checklists.filter(item => item.completed).length;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateBack}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-primary" />
              <span className="font-semibold">Baby Care Guide</span>
            </div>
          </div>
          <MonthTimeline
            selectedMonth={selectedMonth}
            availableMonths={availableMonths}
            onSelectMonth={setSelectedMonth}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="text-base px-3 py-1">
              {monthData.ageLabel}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{monthData.title}</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">{monthData.description}</p>
          
          <ProgressBar
            current={completedCount}
            total={checklists.length}
            label="Overall Progress"
          />
        </div>

        <Tabs defaultValue="checklists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="checklists" data-testid="tab-checklists">
              Checklists
            </TabsTrigger>
            <TabsTrigger value="milestones" data-testid="tab-milestones">
              Milestones & Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklists" className="space-y-6">
            {categories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                items={getCategoryItems(category)}
                onToggleItem={handleToggleItem}
              />
            ))}
          </TabsContent>

          <TabsContent value="milestones">
            <MilestoneCard milestones={monthData.milestones} tips={monthData.tips} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
