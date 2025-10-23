import { Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Baby as BabyType } from "@shared/schema";
import { ChevronDown } from "lucide-react";

interface BabySelectorProps {
  babies: BabyType[];
  selectedBaby: BabyType | null;
  onSelectBaby: (baby: BabyType) => void;
  onManageBabies: () => void;
}

export default function BabySelector({
  babies,
  selectedBaby,
  onSelectBaby,
  onManageBabies,
}: BabySelectorProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAgeLabel = (baby: BabyType) => {
    const birthDate = new Date(baby.birthdate);
    const now = new Date();
    const months = Math.floor(
      (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );
    if (months === 0) return "Newborn";
    if (months === 1) return "1 month";
    return `${months} months`;
  };

  if (!selectedBaby && babies.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-baby-selector">
          {selectedBaby ? (
            <>
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {getInitials(selectedBaby.name)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{selectedBaby.name}</span>
            </>
          ) : (
            <>
              <Baby className="h-4 w-4" />
              <span>Select Baby</span>
            </>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Your Babies</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {babies.map((baby) => (
          <DropdownMenuItem
            key={baby.id}
            onClick={() => onSelectBaby(baby)}
            data-testid={`menu-item-baby-${baby.id}`}
          >
            <div className="flex items-center gap-3 w-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(baby.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{baby.name}</div>
                <div className="text-xs text-muted-foreground">
                  {getAgeLabel(baby)}
                </div>
              </div>
              {selectedBaby?.id === baby.id && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onManageBabies} data-testid="button-manage-babies">
          Manage Babies
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
