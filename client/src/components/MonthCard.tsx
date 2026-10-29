import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Baby, Camera, Trash2 } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useMonthPhotoActions, useMonthPhotoUrl } from "@/lib/photos";

interface MonthCardProps {
  month: number;
  ageLabel: string;
  title: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  babyId: string;
  hasPhoto: boolean;
  isCurrent?: boolean;
  onClick: () => void;
}

export default function MonthCard({
  month,
  ageLabel,
  title,
  description,
  completedTasks,
  totalTasks,
  babyId,
  hasPhoto,
  isCurrent = false,
  onClick
}: MonthCardProps) {
  const { t } = useTranslation("MONTH");
  const { toast } = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const imageUrl = useMonthPhotoUrl(babyId, month, hasPhoto);
  const { upload, remove } = useMonthPhotoActions(babyId, month);
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className={`overflow-hidden hover-elevate cursor-pointer ${isCurrent ? "ring-2 ring-primary shadow-md" : ""}`} aria-current={isCurrent ? "true" : undefined} onClick={onClick} data-testid={`card-month-${month}`}>
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <>
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/15 to-primary/5">
            <Baby className="h-12 w-12 text-primary/40" />
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); fileInput.current?.click(); }}
              disabled={upload.isPending}
              data-testid={`button-add-photo-${month}`}
            >
              <Camera className="mr-2 h-4 w-4" />
              {t("addPhoto")}
            </Button>
          </div>
        )}
        {/* Badge sets its own `relative`, which beats `absolute` on the element itself, so position a wrapper */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge className="bg-background/90 text-foreground border">{ageLabel}</Badge>
          {isCurrent && <Badge data-testid={`badge-current-${month}`}>{t("thisMonth")}</Badge>}
        </div>
        {imageUrl && (
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              aria-label={t("changePhoto")}
              onClick={(e) => { e.stopPropagation(); fileInput.current?.click(); }}
              disabled={upload.isPending}
              data-testid={`button-change-photo-${month}`}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              aria-label={t("removePhoto")}
              onClick={(e) => { e.stopPropagation(); remove.mutate(); }}
              disabled={remove.isPending}
              data-testid={`button-remove-photo-${month}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = ""; // so picking the same file again still fires
            if (file) upload.mutate(file, { onError: () => toast({ title: t("photoFailed"), variant: "destructive" }) });
          }}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("progress")}</span>
            <span className="font-medium" data-testid={`text-progress-${month}`}>
              {completedTasks}/{totalTasks} ({percentage}%)
            </span>
          </div>
          <Progress value={percentage} />
        </div>
        <Button className="w-full" data-testid={`button-view-month-${month}`}>
          {t("viewDetails")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
