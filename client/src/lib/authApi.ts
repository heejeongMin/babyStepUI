import { BASE_URL } from "./config";

export class ApiError extends Error {
  /** Seconds to wait before retrying, from the Retry-After header on a 429. */
  constructor(public status: number, public retryAfter?: number) {
    super(`HTTP ${status}`);
  }
}

async function call(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(BASE_URL + path, init);
  if (!res.ok) {
    const retryAfter = Number(res.headers.get("Retry-After"));
    throw new ApiError(res.status, retryAfter > 0 ? retryAfter : undefined);
  }
  return res;
}

const json = (body: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export async function login(email: string, password: string): Promise<string> {
  const res = await call("/api/auth/login", json({ email, password }));
  return (await res.json()).token;
}

export async function register(
  email: string,
  password: string,
  recoveryQuestion: string,
  recoveryAnswer: string,
): Promise<string> {
  const res = await call(
    "/api/auth/register",
    json({ email, password, recoveryQuestion, recoveryAnswer }),
  );
  return (await res.json()).token;
}

export async function getRecoveryQuestion(email: string): Promise<string> {
  const res = await call(`/api/auth/recovery-question?email=${encodeURIComponent(email)}`);
  return (await res.json()).question;
}

export async function resetPassword(
  email: string,
  recoveryAnswer: string,
  newPassword: string,
): Promise<void> {
  await call("/api/auth/reset-password", json({ email, recoveryAnswer, newPassword }));
}
