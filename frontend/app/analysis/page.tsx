"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import ScoreGauge from "@/components/ScoreGauge";
import KeywordChip from "@/components/KeywordChip";
import ImprovementCard from "@/components/ImprovementCard";
import DownloadReport from "@/components/DownloadReport";

export default function AnalysisPage() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume,
          jd,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Backend Error: " + data.error);
        return;
      }

      setResult(data.data);
    } catch (error: any) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl">

        {/* HEADER */}
        <h1 className="text-center text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Smart Placement Fit Analyzer
        </h1>

        <p className="text-center text-gray-300 mb-10 text-lg">
          Paste your resume and JD. Get instant AI-powered placement fit insights.
        </p>

        {/* TEXT INPUT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div>
            <label className="block mb-2 text-lg font-semibold">Resume</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-60 p-4 rounded-xl bg-white/10 border border-white/10 text-white resize-none outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste your Resume here..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-lg font-semibold">Job Description</label>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full h-60 p-4 rounded-xl bg-white/10 border border-white/10 text-white resize-none outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste the Job Description here..."
            ></textarea>
          </div>
        </div>

        {/* ANALYZE BUTTON */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-8 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition disabled:opacity-40"
          >
            🚀 Analyze Fit
          </button>
        </div>

        {/* LOADER */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="mt-10 space-y-12">

            {/* SCORE */}
            <div className="flex justify-center">
              <ScoreGauge score={result.fit_analysis.fit_score} />
            </div>

            {/* MISSING KEYWORDS */}
            <div>
              <h2 className="text-2xl font-bold mb-3">Missing Keywords</h2>
              <div className="flex flex-wrap gap-3">
                {(result.fit_analysis?.missing_keywords ?? []).map(
                  (kw: string, i: number) => <KeywordChip key={i} keyword={kw} />
                )}
              </div>
            </div>

            {/* IMPROVEMENTS */}
            <div>
              <h2 className="text-2xl font-bold mb-3">Actionable Improvements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(result.fit_analysis?.recommended_fixes ?? []).map(
                  (imp: string, i: number) => <ImprovementCard key={i} text={imp} />
                )}
              </div>
            </div>

            {/* RECOMMENDED PROJECTS */}
            <div>
              <h2 className="text-2xl font-bold mb-3">Recommended Projects</h2>
              <ul className="list-disc ml-5 text-gray-300 space-y-2">
                {(result.fit_analysis?.recommended_projects ?? []).map(
                  (p: string, i: number) => <li key={i}>{p}</li>
                )}
              </ul>
            </div>

            {/* SEVEN DAY PLAN */}
            <div>
              <h2 className="text-2xl font-bold mb-3">7-Day Plan</h2>
              <ul className="list-decimal ml-5 text-gray-300 space-y-2">
                {(result.fit_analysis?.seven_day_plan ?? []).map(
                  (p: string, i: number) => <li key={i}>{p}</li>
                )}
              </ul>
            </div>

            {/* DOWNLOAD REPORT */}
            <DownloadReport result={result} />

          </div>
        )}
      </div>
    </div>
  );
}
