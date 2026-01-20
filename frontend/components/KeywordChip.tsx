export default function KeywordChip({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-neutral-800 border border-neutral-600 rounded-full text-sm">
      {label}
    </span>
  );
}
