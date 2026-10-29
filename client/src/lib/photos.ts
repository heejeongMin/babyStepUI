import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "./config";
import { authHeaders } from "./auth";

const MAX_SIDE = 1000;
const JPEG_QUALITY = 0.82;

const photoPath = (babyId: string, month: number) => `${BASE_URL}/api/babies/${babyId}/months/${month}/photo`;

/** Downscales and re-encodes as JPEG, so uploads stay small and phone-camera EXIF (location) is dropped. */
export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), "image/jpeg", JPEG_QUALITY),
  );
}

async function fetchPhoto(babyId: string, month: number): Promise<Blob> {
  const res = await fetch(photoPath(babyId, month), { headers: authHeaders() });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.blob();
}

/** Photos sit behind auth, so an <img src> can't load them directly: fetch the blob and hand out an object URL. */
export function useMonthPhotoUrl(babyId: string, month: number, hasPhoto: boolean): string | undefined {
  const { data } = useQuery<Blob>({
    queryKey: ["monthPhoto", babyId, month],
    queryFn: () => fetchPhoto(babyId, month),
    enabled: hasPhoto,
  });
  const url = useMemo(() => (data ? URL.createObjectURL(data) : undefined), [data]);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  // a disabled query still returns its cached blob, so the photo list decides whether to show it
  return hasPhoto ? url : undefined;
}

export function useMonthPhotoActions(babyId: string, month: number) {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/babies", babyId, "photos"] });
    queryClient.invalidateQueries({ queryKey: ["monthPhoto", babyId, month] });
  };

  const upload = useMutation({
    mutationFn: async (file: File) => {
      const body = await compressImage(file);
      const res = await fetch(photoPath(babyId, month), {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": body.type },
        body,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    },
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: async () => {
      const res = await fetch(photoPath(babyId, month), { method: "DELETE", headers: authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["monthPhoto", babyId, month] });
      refresh();
    },
  });

  return { upload, remove };
}
