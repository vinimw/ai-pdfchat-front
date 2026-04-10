import type { Meta, StoryObj } from "@storybook/nextjs";
import { AppShell } from "./app-shell";

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Estrutura base da aplicacao com sidebar fixa e area principal de conteudo.",
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/documents",
      },
    },
  },
  args: {
    children: (
      <main className="px-5 py-8 md:px-8">
        <section className="app-surface rounded-[18px] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Preview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Workspace content
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            This area represents any routed page rendered inside the shell.
          </p>
        </section>
      </main>
    ),
  },
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
