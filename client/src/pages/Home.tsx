import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import MonthCard from "@/components/MonthCard";
import { monthsData } from "@/lib/monthData";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Parent_holding_happy_baby_64d932c1.png";
import sittingImage from "@assets/generated_images/Baby_sitting_milestone_10b3d727.png";
import crawlingImage from "@assets/generated_images/Baby_crawling_milestone_10bece49.png";
import type { Baby, ChecklistProgress } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { calculateCurrentMonth, getAgeLabel } from "@/lib/babyUtils";
import { useTranslation } from 'react-i18next';


interface HomeProps {
  selectedBaby: Baby;
  onNavigateToMonth: (month: number) => void;
}

export default function Home({ selectedBaby, onNavigateToMonth }: HomeProps) {
  const queryClient = useQueryClient();
  const { t } = useTranslation("HOME");

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

  const getMonthImage = (month: number) => {
    if (month === 6) return sittingImage;
    if (month === 12) return crawlingImage;
    return undefined;
  };

  const getCompletedCount = (month: number) => {
    const monthData = monthsData.find(m => m.month === month);
    if (!monthData) return 0;

    return monthData.checklists.filter(item =>
      progress.some(p => p.checklistItemId === item.id && p.completed)
    ).length;
  };

  const currentMonth = calculateCurrentMonth(selectedBaby.birthdate);
  const name = selectedBaby.name

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Parent and baby"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {/* {selectedBaby.name} {t("greeting", { name: '{ selectedBaby.name }' })} */}
            {t("greeting", { name: name })}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-2">
            {getAgeLabel(selectedBaby, t)}
          </p>
          <p className="text-base text-white/80 mb-8">
            {t("introduction")}
          </p>
          <Button
            size="lg"
            variant="default"
            className="bg-primary/90 backdrop-blur-sm"
            onClick={() => onNavigateToMonth(currentMonth)}
            data-testid="button-current-month"
          >
            {t("currentMonthGuide")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t("monthlyGuide")}</h2>
          <p className="text-muted-foreground">
            {t("monthlyGuideDesc")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {monthsData.map((month) => (
            <MonthCard
              key={month.month}
              month={month.month}
              ageLabel={month.ageLabel}
              title={month.title}
              description={month.description}
              completedTasks={getCompletedCount(month.month)}
              totalTasks={month.checklists.length}
              imageUrl={getMonthImage(month.month)}
              onClick={() => onNavigateToMonth(month.month)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
