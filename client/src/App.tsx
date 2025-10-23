import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import MonthDetail from "@/pages/MonthDetail";
import ThemeToggle from "@/components/ThemeToggle";

type View = { type: 'home' } | { type: 'month', month: number };

function App() {
  const [currentView, setCurrentView] = useState<View>({ type: 'home' });

  const navigateToMonth = (month: number) => {
    setCurrentView({ type: 'month', month });
  };

  const navigateToHome = () => {
    setCurrentView({ type: 'home' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {currentView.type === 'home' && (
            <>
              <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>
              <Home onNavigateToMonth={navigateToMonth} />
            </>
          )}
          {currentView.type === 'month' && (
            <MonthDetail
              initialMonth={currentView.month}
              onNavigateBack={navigateToHome}
            />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
