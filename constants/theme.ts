import { Platform } from 'react-native';

const tintColorLight = '#6366f1';
const tintColorDark = '#a5b4fc';

export const Colors = {
  light: {
    text: '#1e1b4b',
    secondaryText: '#64748b',
    background: '#f8fafc',
    surface: '#ffffff',
    tint: tintColorLight,
    icon: '#6366f1',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorLight,
    border: '#e2e8f0',
    success: '#10b981',
    danger: '#ef4444',
    priorityHigh: '#ef4444',
    priorityMedium: '#f59e0b',
    priorityLow: '#10b981',
    chipBg: '#f1f5f9',
    chipActiveBg: '#6366f1',
    chipActiveText: '#ffffff',
    cardShadow: '#0000000d',
  },
  dark: {
    text: '#e2e8f0',
    secondaryText: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    tint: tintColorDark,
    icon: '#a5b4fc',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorDark,
    border: '#334155',
    success: '#34d399',
    danger: '#f87171',
    priorityHigh: '#f87171',
    priorityMedium: '#fbbf24',
    priorityLow: '#34d399',
    chipBg: '#334155',
    chipActiveBg: '#6366f1',
    chipActiveText: '#ffffff',
    cardShadow: '#00000033',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
