import { useState } from "react";
import { Button } from "@/components/ui/button";
import MonthCard from "@/components/MonthCard";
import { monthsData } from "@/lib/monthData";
import { Baby, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Parent_holding_happy_baby_64d932c1.png";
import sittingImage from "@assets/generated_images/Baby_sitting_milestone_10b3d727.png";
import crawlingImage from "@assets/generated_images/Baby_crawling_milestone_10bece49.png";

interface HomeProps {
  onNavigateToMonth: (month: number) => void;
}

export default function Home({ onNavigateToMonth }: HomeProps) {
  const [checklists, setChecklists] = useState(
    monthsData.map(month => ({
      month: month.month,
      items: month.checklists
    }))
  );

  const getMonthImage = (month: number) => {
    if (month === 6) return sittingImage;
    if (month === 12) return crawlingImage;
    return undefined;
  };

  const getCompletedCount = (month: number) => {
    const monthData = checklists.find(m => m.month === month);
    return monthData?.items.filter(item => item.completed).length || 0;
  };

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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Baby className="h-8 w-8 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Baby Care Guide
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Your month-by-month companion for baby's first two years. 
            Track milestones, checklists, and developmental tips.
          </p>
          <Button
            size="lg"
            variant="default"
            className="bg-primary/90 backdrop-blur-sm"
            onClick={() => onNavigateToMonth(0)}
            data-testid="button-get-started"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Monthly Guides</h2>
          <p className="text-muted-foreground">
            Explore comprehensive checklists and information for each month
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
