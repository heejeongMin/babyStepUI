import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Baby } from "@shared/schema";
import { useTranslation } from 'react-i18next';


interface AddBabyDialogProps {
  onBabyAdded?: (baby: Baby) => void;
}

export default function AddBabyDialog({ onBabyAdded }: AddBabyDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation("HOME");
  const { t: tb } = useTranslation("BABY");


  const createBabyMutation = useMutation({
    mutationFn: async (data: { name: string; birthdate: string }) => {
      const response = await apiRequest(
        "POST",
        "/api/babies",
        {
          name: data.name,
          birthdate: new Date(data.birthdate).toISOString(),
        }
      );
      return await response.json() as Baby;
    },
    onSuccess: (baby) => {
      queryClient.invalidateQueries({ queryKey: ["/api/babies"] });
      toast({
        title: tb("added"),
        description: tb("addedDesc", { name: baby.name }),
      });
      setOpen(false);
      setName("");
      setBirthdate("");
      onBabyAdded?.(baby);
    },
    onError: () => {
      toast({
        title: tb("error"),
        description: tb("addFailed"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthdate) {
      toast({
        title: tb("missingInfo"),
        description: tb("fillAll"),
        variant: "destructive",
      });
      return;
    }
    createBabyMutation.mutate({ name, birthdate });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-add-baby">
          <Plus className="mr-0 h-4 w-4" />
          {/* {t("addBaby")} */}
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="dialog-add-baby">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{tb("addTitle")}</DialogTitle>
            <DialogDescription>
              {tb("addDesc")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{tb("name")}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tb("namePlaceholder")}
                data-testid="input-baby-name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthdate">{tb("birthdate")}</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                data-testid="input-baby-birthdate"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={createBabyMutation.isPending}
              data-testid="button-submit-baby"
            >
              {createBabyMutation.isPending ? tb("adding") : tb("add")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
