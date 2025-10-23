import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Baby } from "@shared/schema";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ManageBabiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  babies: Baby[];
  selectedBaby: Baby | null;
  onBabyDeleted?: (babyId: string) => void;
}

export default function ManageBabiesDialog({
  open,
  onOpenChange,
  babies,
  selectedBaby,
  onBabyDeleted,
}: ManageBabiesDialogProps) {
  const [babyToDelete, setBabyToDelete] = useState<Baby | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteBabyMutation = useMutation({
    mutationFn: async (babyId: string) => {
      await apiRequest("DELETE", `/api/babies/${babyId}`);
      return babyId;
    },
    onSuccess: (babyId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/babies"] });
      toast({
        title: "Baby removed",
        description: "The baby profile has been deleted.",
      });
      setBabyToDelete(null);
      onBabyDeleted?.(babyId);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete baby. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAgeLabel = (baby: Baby) => {
    const birthDate = new Date(baby.birthdate);
    const now = new Date();
    const months = Math.floor(
      (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );
    if (months === 0) return "Newborn";
    if (months === 1) return "1 month";
    return `${months} months`;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent data-testid="dialog-manage-babies">
          <DialogHeader>
            <DialogTitle>Manage Babies</DialogTitle>
            <DialogDescription>
              View and manage all baby profiles.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {babies.map((baby) => (
              <Card key={baby.id} data-testid={`card-baby-${baby.id}`}>
                <CardContent className="flex items-center gap-3 p-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(baby.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{baby.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {getAgeLabel(baby)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setBabyToDelete(baby)}
                    disabled={selectedBaby?.id === baby.id && babies.length === 1}
                    data-testid={`button-delete-baby-${baby.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {babies.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No babies added yet.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!babyToDelete}
        onOpenChange={(open) => !open && setBabyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Baby Profile?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {babyToDelete?.name}'s profile? This will
              remove all their progress and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                babyToDelete && deleteBabyMutation.mutate(babyToDelete.id)
              }
              className="bg-destructive text-destructive-foreground"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
