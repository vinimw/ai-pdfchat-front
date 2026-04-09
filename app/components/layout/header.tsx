type Props = {
  title?: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: Props) {
  return (
    <header className="border-b bg-white px-6 py-5">
      <div>
        {title ? <h1 className="text-2xl font-semibold">{title}</h1> : null}
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        ) : null}
      </div>
    </header>
  );
}