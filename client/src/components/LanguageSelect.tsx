import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import type { i18n as I18n } from "i18next";

export function applyLanguage(i18n: I18n, lang: "en" | "ko") {
  i18n.changeLanguage(lang);
  try {
    localStorage.setItem("language", lang);
  } catch {
    // storage unavailable (private mode); the choice just won't persist
  }
}

export default function LanguageSelect() {
  const { i18n } = useTranslation();

  const handleSelect = (code: string) => applyLanguage(i18n, code === "US" ? "en" : "ko");

  return (
    <ReactFlagsSelect
      countries={["US", "KR"]}
      selected={i18n.language.startsWith("en") ? "US" : "KR"}
      customLabels={{ US: { primary: "" }, KR: { primary: "" } }}
      onSelect={handleSelect}
    />
  );
}
