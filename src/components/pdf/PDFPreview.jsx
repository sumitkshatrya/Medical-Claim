import { PDFViewer } from "@react-pdf/renderer";
import ClaimAuditPDF from "./ClaimAuditPDF";

export default function PDFPreview({ data }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500">No PDF data available</p>
      </div>
    );
  }

  return (
    <PDFViewer width="100%" height="100%" className="border-0">
      <ClaimAuditPDF data={data} />
    </PDFViewer>
  );
}