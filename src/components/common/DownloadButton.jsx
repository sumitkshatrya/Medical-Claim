
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ClaimAuditPDF from "../pdf/ClaimAuditPDF";

export default function DownloadButton({ data }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!data) {
      alert("No data available to generate PDF");
      return;
    }

    setLoading(true);
    try {
      console.log("Generating PDF with data:", data.claim_id);
      
      // Generate PDF blob
      const blob = await pdf(<ClaimAuditPDF data={data} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Claim_Audit_${data?.claim_id || 'report'}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      console.log("PDF downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
      alert(`Failed to generate PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          Generating...
        </>
      ) : (
        "Download PDF"
      )}
    </button>
  );
}