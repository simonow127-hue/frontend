"use client";

type Props = {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
};

const PRESETS: { label: string; days: number }[] = [
  { label: "7 days", days: 7 },
  { label: "14 days", days: 14 },
  { label: "30 days", days: 30 },
];

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - (days - 1));
  return d.toISOString().slice(0, 10);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DateRangePicker({ from, to, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => onChange(e.target.value, to)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => onChange(from, e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        />
      </div>
      <div className="flex gap-2 pb-0.5">
        {PRESETS.map((p) => (
          <button
            key={p.days}
            type="button"
            onClick={() => onChange(isoDaysAgo(p.days), todayIso())}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-brand-primary hover:text-brand-primary"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
