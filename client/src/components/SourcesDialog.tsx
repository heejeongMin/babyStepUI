import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SOURCES } from "@/lib/sources";

/** Text link that opens the list of where the guide's information comes from. */
export default function SourcesDialog() {
  const { t, i18n } = useTranslation("MONTH");
  const lang = i18n.language.startsWith("en") ? "en" : "ko";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="underline underline-offset-2 hover:text-foreground" data-testid="button-sources">
          {t("sources")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("sourcesTitle")}</DialogTitle>
          <DialogDescription>{t("sourcesIntro")}</DialogDescription>
        </DialogHeader>
        <ul className="space-y-4">
          {SOURCES.map((s) => (
            <li key={s.url} className="space-y-1">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sm inline-flex items-start gap-1.5 text-primary hover:underline"
              >
                <span>{s.name[lang]}</span>
                <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              </a>
              <p className="text-xs text-muted-foreground">
                {t("sourcesUsedFor")}: {s.usedFor[lang]}
              </p>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
