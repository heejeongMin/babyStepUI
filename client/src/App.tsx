import { useState, useEffect } from "react";
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

import { queryClient } from "./lib/queryClient";
import { getToken, setToken, LOGOUT_EVENT } from "./lib/auth";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import MonthDetail from "@/pages/MonthDetail";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelect from "@/components/LanguageSelect";
import SettingsMenu from "@/components/SettingsMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import BabySelector from "@/components/BabySelector";
import AddBabyDialog from "@/components/AddBabyDialog";
import ManageBabiesDialog from "@/components/ManageBabiesDialog";
import type { Baby } from "@shared/schema";
import { Baby as BabyIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthPage from "@/pages/AuthPage";
import './i18n';
import { useTranslation } from 'react-i18next';


type View = { type: 'home' } | { type: 'month', month: number };

function AppContent() {
  const { t } = useTranslation("APP");
  const isMobile = useIsMobile();
  const { t: tAuth } = useTranslation("AUTH");
  const [token, setTokenState] = useState<string | null>(getToken());

  const [currentView, setCurrentView] = useState<View>({ type: 'home' });
  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null);
  const [showManageBabies, setShowManageBabies] = useState(false);

  const { data: babies = [] } = useQuery<Baby[]>({
    queryKey: ["/api/babies"],
    enabled: !!token,
  });

  const clearSession = () => {
    localStorage.removeItem("selectedBabyId");
    queryClient.clear();
    setSelectedBaby(null);
    setCurrentView({ type: 'home' });
    setTokenState(null);
  };

  // the server rejected our token (expired/invalid)
  useEffect(() => {
    window.addEventListener(LOGOUT_EVENT, clearSession);
    return () => window.removeEventListener(LOGOUT_EVENT, clearSession);
  }, []);

  const handleAuthenticated = (newToken: string) => {
    setToken(newToken);
    // drop anything cached for a previous session before the new user's data loads
    queryClient.clear();
    setTokenState(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    clearSession();
  };

  useEffect(() => {
    const savedBabyId = localStorage.getItem("selectedBabyId");
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

  if (!token) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {!showWelcome && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-2 md:gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  role="img"
                  aria-label={t("appName")}
                  className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                  <BabyIcon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold hidden md:inline">{t("appName")}</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                {babies.length > 0 && (
                  <BabySelector
                    babies={babies}
                    selectedBaby={selectedBaby}
                    onSelectBaby={handleSelectBaby}
                    onManageBabies={() => setShowManageBabies(true)}
                  />
                )}
                <AddBabyDialog onBabyAdded={handleBabyAdded} />
                {isMobile ? (
                  <SettingsMenu onLogout={handleLogout} />
                ) : (
                  <>
                    <ThemeToggle />
                    <LanguageSelect />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLogout}
                      aria-label={tAuth("logout")}
                      title={tAuth("logout")}
                      data-testid="button-logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {showWelcome ? (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <LanguageSelect />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label={tAuth("logout")}
              title={tAuth("logout")}
              data-testid="button-logout-welcome"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center max-w-md">
            <BabyIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">{t("welcomeTitle")}</h1>
            <p className="text-muted-foreground mb-6">{t("welcomeDesc")}</p>
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
