import type React from "react";

import { ThemeProvider } from "next-themes";

export function AppThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
