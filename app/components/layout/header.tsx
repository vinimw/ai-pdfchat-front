type Props = {
  title?: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: Props) {
  return (
    <header className="px-5 pt-5 md:px-8 md:pt-8">
      <div className="app-surface rounded-[28px] px-6 py-6 md:px-8 md:py-7">
        {title ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Workspace
          </p>
        ) : null}
        {title ? (
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
