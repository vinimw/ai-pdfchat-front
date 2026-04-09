import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="app-grid min-h-screen md:flex">
      <Sidebar />

      <div className="relative flex-1">
        {children}
      </div>
    </div>
  );
}
