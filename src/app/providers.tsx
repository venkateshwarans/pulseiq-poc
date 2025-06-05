"use client";

import { ThemeProvider } from "@crayonai/react-ui";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
