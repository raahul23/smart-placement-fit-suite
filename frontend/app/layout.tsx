import "../styles/globals.css";

export const metadata = {
  title: "Smart Placement Fit Analyzer",
  description: "AI-powered job fit analyzer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
