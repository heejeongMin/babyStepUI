import { Check, Languages, LogOut, Moon, MoreHorizontal, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { applyTheme } from "@/components/ThemeToggle";
import { applyLanguage } from "@/components/LanguageSelect";

/** Phone-width stand-in for the theme, language and logout buttons, which don't fit in one header row. */
export default function SettingsMenu({ onLogout }: { onLogout: () => void }) {
  const { t, i18n } = useTranslation("APP");
  const { t: tAuth } = useTranslation("AUTH");
  const isDark = document.documentElement.classList.contains("dark");
  const isEnglish = i18n.language.startsWith("en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("settings")} data-testid="button-settings">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => applyTheme(isDark ? "light" : "dark")} data-testid="menu-theme">
          {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          {isDark ? t("lightMode") : t("darkMode")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
          <Languages className="h-4 w-4" />
          {t("language")}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => applyLanguage(i18n, "ko")} data-testid="menu-lang-ko">
          <span className="flex-1">{t("languageKo")}</span>
          {!isEnglish && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyLanguage(i18n, "en")} data-testid="menu-lang-en">
          <span className="flex-1">{t("languageEn")}</span>
          {isEnglish && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} data-testid="menu-logout">
          <LogOut className="mr-2 h-4 w-4" />
          {tAuth("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
