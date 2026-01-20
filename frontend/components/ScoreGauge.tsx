"use client";
import { useEffect, useState } from "react";

export default function ScoreGauge({ score }: { score: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(score), 300);
    return () => clearTimeout(timeout);
  }, [score]);

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="#333"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="rgb(59,130,246)"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <p className="text-4xl font-bold -mt-20 rotate-90">{value}%</p>
      <p className="text-neutral-400 mt-6 text-lg">Match Score</p>
    </div>
  );
}
