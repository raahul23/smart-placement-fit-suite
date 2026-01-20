export default function ImprovementCard({ text }: { text: string }) {
  return (
    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-700">
      {text}
    </div>
  );
}
