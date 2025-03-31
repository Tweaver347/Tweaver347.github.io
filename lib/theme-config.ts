// Theme configuration for different sections of the application

export type ThemeType = "lesson" | "student" | "research" | "profile" | "default"

export interface ThemeColors {
  primary: string
  primaryHover: string
  secondary: string
  accent: string
  accentHover: string
  background: string
  cardBackground: string
  buttonText: string
  footerBackground: string
}

export const themeColors: Record<ThemeType, ThemeColors> = {
  default: {
    primary: "#4f378a", // Purple
    primaryHover: "#65558f",
    secondary: "#eaddff",
    accent: "#d8c4ff",
    accentHover: "#c9b3f9",
    background: "#f2f2f7",
    cardBackground: "#d9d9d9",
    buttonText: "#ffffff",
    footerBackground: "#1d1b20",
  },
  lesson: {
    primary: "#4f378a", // Purple
    primaryHover: "#65558f",
    secondary: "#eaddff",
    accent: "#d8c4ff",
    accentHover: "#c9b3f9",
    background: "#f2f2f7",
    cardBackground: "#d9d9d9",
    buttonText: "#ffffff",
    footerBackground: "#1d1b20",
  },
  student: {
    primary: "#2196f3", // Blue
    primaryHover: "#1976d2",
    secondary: "#e3f2fd",
    accent: "#bbdefb",
    accentHover: "#90caf9",
    background: "#f5f9ff",
    cardBackground: "#e1effe",
    buttonText: "#ffffff",
    footerBackground: "#0d47a1",
  },
  research: {
    primary: "#ff5722", // Orange/Red
    primaryHover: "#e64a19",
    secondary: "#ffecb3",
    accent: "#ffcc80",
    accentHover: "#ffb74d",
    background: "#fff8f0",
    cardBackground: "#ffeadb",
    buttonText: "#ffffff",
    footerBackground: "#bf360c",
  },
  profile: {
    primary: "#4caf50", // Green
    primaryHover: "#388e3c",
    secondary: "#e8f5e9",
    accent: "#c8e6c9",
    accentHover: "#a5d6a7",
    background: "#f5fff5",
    cardBackground: "#e0f2e0",
    buttonText: "#ffffff",
    footerBackground: "#1b5e20",
  },
}

export function getThemeForPage(path: string): ThemeType {
  if (path.includes("lesson-builder")) return "lesson"
  if (path.includes("student-companion")) return "student"
  if (path.includes("research-hub")) return "research"
  if (path.includes("profile")) return "profile"
  return "default"
}

