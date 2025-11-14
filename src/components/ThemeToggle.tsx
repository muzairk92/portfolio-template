import { useEffect, useState } from "@minireact";
import { applyTheme, getInitialTheme, persistTheme, type ThemeMode } from "@utils/theme";

const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(mode);
    persistTheme(mode);
  }, [mode]);

  const icon = mode === "light" ? "☀" : "☾";
  const label = mode === "light" ? "Switch to dark" : "Switch to light";

  return (
    <button
      className="toggle"
      type="button"
      onClick={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
};

export default ThemeToggle;
