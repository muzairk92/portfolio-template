import { useTheme } from '../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <span className="theme-toggle__icon" aria-hidden>
        {theme === 'light' ? '🌞' : '🌙'}
      </span>
      <span className="theme-toggle__label">{theme === 'light' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

export default ThemeToggle;
