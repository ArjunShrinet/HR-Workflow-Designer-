import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

// Read initial value from localStorage (if available)
function getInitial(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false, // will be hydrated on mount

  toggle: () =>
    set((s) => {
      const next = !s.isDark;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: next };
    }),
}));

// Call this once on app mount to sync with saved preference
export function initTheme() {
  const isDark = getInitial();
  if (isDark) document.documentElement.classList.add('dark');
  useThemeStore.setState({ isDark });
}
