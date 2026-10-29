import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Baby as BabyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelect from "@/components/LanguageSelect";
import ThemeToggle from "@/components/ThemeToggle";
import {
  ApiError,
  getRecoveryQuestion,
  login,
  register,
  resetPassword,
} from "@/lib/authApi";

type Mode = "login" | "register" | "forgot";

interface AuthPageProps {
  onAuthenticated: (token: string) => void;
}

export default function AuthPage({ onAuthenticated }: AuthPageProps) {
  const { t } = useTranslation("AUTH");
  const { t: tApp } = useTranslation("APP");

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  // forgot-password flow: null until the email is looked up, then holds the stored question
  const [resetQuestion, setResetQuestion] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setNotice("");
    setPassword("");
    setResetQuestion(null);
    setNewPassword("");
    setAnswer("");
  };

  const describe = (err: unknown): string => {
    if (!(err instanceof ApiError)) return t("errors.network");
    switch (err.status) {
      case 400:
        return t("errors.invalidInput");
      case 401:
        return mode === "forgot" ? t("errors.wrongAnswer") : t("errors.invalidCredentials");
      case 404:
        return t("errors.noAccount");
      case 409:
        return t("errors.emailTaken");
      case 429:
        return err.retryAfter
          ? t("errors.tooManyIn", { minutes: Math.ceil(err.retryAfter / 60) })
          : t("errors.tooMany");
      default:
        return t("errors.network");
    }
  };

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (err) {
      setError(describe(err));
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (mode === "login") {
      run(async () => onAuthenticated(await login(trimmedEmail, password)));
    } else if (mode === "register") {
      run(async () =>
        onAuthenticated(await register(trimmedEmail, password, question, answer)),
      );
    } else if (resetQuestion === null) {
      run(async () => setResetQuestion(await getRecoveryQuestion(trimmedEmail)));
    } else {
      run(async () => {
        await resetPassword(trimmedEmail, answer, newPassword);
        switchMode("login");
        setNotice(t("resetDone"));
      });
    }
  };

  const title =
    mode === "login" ? t("login") : mode === "register" ? t("register") : t("resetPassword");
  const submitLabel =
    mode === "forgot" && resetQuestion === null ? t("continue") : title;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSelect />
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <BabyIcon className="h-12 w-12 mx-auto mb-3 text-primary" />
          <h1 className="text-2xl font-bold">{tApp("appName")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("tagline")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4" data-testid="form-auth">
              <div className="space-y-2">
                <Label htmlFor="auth-email">{t("email")}</Label>
                <Input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={mode === "forgot" && resetQuestion !== null}
                  data-testid="input-email"
                />
              </div>

              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="auth-password">{t("password")}</Label>
                  <Input
                    id="auth-password"
                    type="password"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    required
                    minLength={mode === "register" ? 8 : undefined}
                    maxLength={72}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="input-password"
                  />
                  {mode === "register" && (
                    <p className="text-xs text-muted-foreground">{t("passwordHint")}</p>
                  )}
                </div>
              )}

              {mode === "register" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="auth-question">{t("recoveryQuestion")}</Label>
                    <Input
                      id="auth-question"
                      required
                      maxLength={255}
                      placeholder={t("recoveryQuestionPlaceholder")}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      data-testid="input-recovery-question"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-answer">{t("recoveryAnswer")}</Label>
                    <Input
                      id="auth-answer"
                      required
                      autoComplete="off"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      data-testid="input-recovery-answer"
                    />
                    <p className="text-xs text-muted-foreground">{t("recoveryHint")}</p>
                  </div>
                </>
              )}

              {mode === "forgot" && resetQuestion !== null && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="auth-answer">{resetQuestion}</Label>
                    <Input
                      id="auth-answer"
                      required
                      autoComplete="off"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      data-testid="input-reset-answer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-new-password">{t("newPassword")}</Label>
                    <Input
                      id="auth-new-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      maxLength={72}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      data-testid="input-new-password"
                    />
                    <p className="text-xs text-muted-foreground">{t("passwordHint")}</p>
                  </div>
                </>
              )}

              {notice && (
                <p className="text-sm text-primary" role="status" data-testid="text-notice">
                  {notice}
                </p>
              )}
              {error && (
                <p className="text-sm text-destructive" role="alert" data-testid="text-error">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={busy} data-testid="button-submit">
                {submitLabel}
              </Button>
            </form>

            <div className="mt-4 space-y-2 text-center text-sm">
              {mode === "login" && (
                <>
                  <button
                    type="button"
                    className="text-muted-foreground hover:underline"
                    onClick={() => switchMode("forgot")}
                    data-testid="link-forgot"
                  >
                    {t("forgotPassword")}
                  </button>
                  <p>
                    <span className="text-muted-foreground">{t("noAccount")} </span>
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => switchMode("register")}
                      data-testid="link-register"
                    >
                      {t("register")}
                    </button>
                  </p>
                </>
              )}
              {mode === "register" && (
                <p>
                  <span className="text-muted-foreground">{t("haveAccount")} </span>
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => switchMode("login")}
                    data-testid="link-login"
                  >
                    {t("login")}
                  </button>
                </p>
              )}
              {mode === "forgot" && (
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => switchMode("login")}
                  data-testid="link-back-to-login"
                >
                  {t("backToLogin")}
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {t("privacy")}{" "}
          <a href="/privacy" target="_blank" rel="noreferrer" className="underline" data-testid="link-privacy-policy">
            {t("privacyPolicy")}
          </a>
        </p>
      </div>
    </div>
  );
}
