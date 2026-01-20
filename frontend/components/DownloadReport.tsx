"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadReport() {
  const downloadPDF = async () => {
    const element = document.getElementById("report-section");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("placement-fit-report.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-green-600 px-4 py-2 mt-5 rounded-lg hover:bg-green-700"
    >
      Download Report PDF
    </button>
  );
}
