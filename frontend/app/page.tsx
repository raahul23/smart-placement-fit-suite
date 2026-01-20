export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Smart Placement Fit Analyzer</h1>
        <p className="text-neutral-400">
          Upload your resume + JD → get instant AI-powered placement analysis.
        </p>

        <a
          href="/analysis"
          className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 text-lg font-semibold inline-block"
        >
          Go to Analyzer
        </a>
      </div>
    </main>
  );
}
