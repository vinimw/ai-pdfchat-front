import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-zinc-50 md:flex">
      <Sidebar />

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}