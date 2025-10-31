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

interface AddBabyDialogProps {
  onBabyAdded?: (baby: Baby) => void;
}

export default function AddBabyDialog({ onBabyAdded }: AddBabyDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
        title: "Baby added!",
        description: `${baby.name} has been added to your profile.`,
      });
      setOpen(false);
      setName("");
      setBirthdate("");
      console.log(onBabyAdded);
      onBabyAdded?.(baby);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add baby. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthdate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
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
          <Plus className="mr-2 h-4 w-4" />
          Add Baby
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="dialog-add-baby">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a Baby</DialogTitle>
            <DialogDescription>
              Add a baby profile to track their development and milestones.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Baby's name"
                data-testid="input-baby-name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthdate">Birthdate</Label>
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
              {createBabyMutation.isPending ? "Adding..." : "Add Baby"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
