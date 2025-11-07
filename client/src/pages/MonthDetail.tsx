import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressBar from "@/components/ProgressBar";
import CategorySection from "@/components/CategorySection";
import MilestoneCard from "@/components/MilestoneCard";
import MonthTimeline from "@/components/MonthTimeline";
import { getMonthData, getAllMonths } from "@/lib/monthData";
import { ChecklistItem as ChecklistItemType, Baby, ChecklistProgress } from "@shared/schema";
import { ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface MonthDetailProps {
  selectedBaby: Baby;
  initialMonth: number;
  onNavigateBack: () => void;
}

export default function MonthDetail({ selectedBaby, initialMonth, onNavigateBack }: MonthDetailProps) {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [checklists, setChecklists] = useState<ChecklistItemType[]>([]);
  const queryClient = useQueryClient();

  const monthData = getMonthData(selectedMonth);
  const availableMonths = getAllMonths();

  const { data: progress = [] } = useQuery<ChecklistProgress[]>({
    queryKey: ["/api/babies", selectedBaby.id, "progress"],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ checklistItemId, completed }: { checklistItemId: string; completed: boolean }) => {
      const response = await apiRequest(
        "POST",
        `/api/babies/${selectedBaby.id}/progress`,
        { checklistItemId, completed }
      );
      return await response.json() as ChecklistProgress;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/babies", selectedBaby.id, "progress"] });
    },
  });

  useEffect(() => {
    const data = getMonthData(selectedMonth);
    if (data) {
      const checklistsWithProgress = data.checklists.map(item => ({
        ...item,
        completed: progress.some(p => p.checklistItemId === item.id && p.completed)
      }));
      setChecklists(checklistsWithProgress);
    }
  }, [selectedMonth, progress]);

  if (!monthData) {
    return <div>Month not found</div>;
  }

  const handleToggleItem = (id: string) => {
    const item = checklists.find(c => c.id === id);
    if (!item) return;

    const newCompleted = !item.completed;
    setChecklists(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: newCompleted } : item
      )
    );

    updateProgressMutation.mutate({ checklistItemId: id, completed: newCompleted });
  };

  const getCategoryItems = (category: string) => {
    return checklists.filter(item => item.category === category);
  };

  const categories = Array.from(new Set(checklists.map(item => item.category)));
  const completedCount = checklists.filter(item => item.completed).length;

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-card border-b sticky top-[65px] z-40">
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
          </div>
          <MonthTimeline
            selectedMonth={selectedMonth}
            availableMonths={availableMonths}
            onSelectMonth={setSelectedMonth}
          />
        </div>
      </div>

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
