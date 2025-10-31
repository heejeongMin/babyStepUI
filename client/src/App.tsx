import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import MonthDetail from "@/pages/MonthDetail";
import ThemeToggle from "@/components/ThemeToggle";
import BabySelector from "@/components/BabySelector";
import AddBabyDialog from "@/components/AddBabyDialog";
import ManageBabiesDialog from "@/components/ManageBabiesDialog";
import type { Baby } from "@shared/schema";
import { Baby as BabyIcon } from "lucide-react";

type View = { type: 'home' } | { type: 'month', month: number };

function AppContent() {
  const [currentView, setCurrentView] = useState<View>({ type: 'home' });
  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null);
  const [showManageBabies, setShowManageBabies] = useState(false);

  const { data: babies = [] } = useQuery<Baby[]>({
    queryKey: ["/api/babies"],
  });

  useEffect(() => {
    console.log("here first?")
    const savedBabyId = localStorage.getItem("selectedBabyId");
    console.log("savedBabyId")
    console.log(savedBabyId)
    console.log(babies)
    if (savedBabyId && babies.length > 0) {
      const baby = babies.find(b => b.id === savedBabyId);
      if (baby) {
        setSelectedBaby(baby);
        return;
      }
    }
    if (babies.length > 0 && !selectedBaby) {
      setSelectedBaby(babies[0]);
    }
  }, [babies]);

  const handleSelectBaby = (baby: Baby) => {
    setSelectedBaby(baby);
    localStorage.setItem("selectedBabyId", baby.id);
  };

  const handleBabyAdded = (baby: Baby) => {
    setSelectedBaby(baby);
    localStorage.setItem("selectedBabyId", baby.id);
  };

  const handleBabyDeleted = (babyId: string) => {
    if (selectedBaby?.id === babyId) {
      const remaining = babies.filter(b => b.id !== babyId);
      if (remaining.length > 0) {
        handleSelectBaby(remaining[0]);
      } else {
        setSelectedBaby(null);
        localStorage.removeItem("selectedBabyId");
      }
    }
  };

  const navigateToMonth = (month: number) => {
    setCurrentView({ type: 'month', month });
  };

  const navigateToHome = () => {
    setCurrentView({ type: 'home' });
  };

  const showWelcome = babies.length === 0;

  return (
    <div className="min-h-screen bg-background">
      {!showWelcome && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <BabyIcon className="h-5 w-5 text-primary" />
                <span className="font-semibold">Baby Care Guide</span>
              </div>
              <div className="flex items-center gap-2">
                {babies.length > 0 && (
                  <BabySelector
                    babies={babies}
                    selectedBaby={selectedBaby}
                    onSelectBaby={handleSelectBaby}
                    onManageBabies={() => setShowManageBabies(true)}
                  />
                )}
                <AddBabyDialog onBabyAdded={handleBabyAdded} />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
      )}

      {showWelcome ? (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <BabyIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Welcome to Baby Care Guide</h1>
            <p className="text-muted-foreground mb-6">
              Start by adding your baby's profile to track their development and milestones.
            </p>
            <AddBabyDialog onBabyAdded={handleBabyAdded} />
          </div>
        </div>
      ) : (
        <>
          {currentView.type === 'home' && selectedBaby && (
            <Home
              selectedBaby={selectedBaby}
              onNavigateToMonth={navigateToMonth}
            />
          )}
          {currentView.type === 'month' && selectedBaby && (
            <MonthDetail
              selectedBaby={selectedBaby}
              initialMonth={currentView.month}
              onNavigateBack={navigateToHome}
            />
          )}
        </>
      )}

      <ManageBabiesDialog
        open={showManageBabies}
        onOpenChange={setShowManageBabies}
        babies={babies}
        selectedBaby={selectedBaby}
        onBabyDeleted={handleBabyDeleted}
      />

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
