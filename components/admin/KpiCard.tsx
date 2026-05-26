type Props = {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
};

export default function KpiCard({ label, value, hint, accent }: Props) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        accent
          ? "border-brand-primary/30 bg-gradient-to-br from-brand-cream to-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
