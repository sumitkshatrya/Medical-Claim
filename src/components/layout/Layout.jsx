import { useState } from "react";
import PDFPreview from "../pdf/PDFPreview";
import FormPanel from "../claim/FormPanel";

export default function Layout({ data }) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="h-full flex overflow-hidden">
      {/* LEFT PANEL - PDF VIEWER */}
      <div className="w-1/2 border-r bg-gray-200 h-full">
        <PDFPreview 
          data={data} 
          pageNumber={pageNumber} 
          setPageNumber={setPageNumber}
        />
      </div>

      {/* RIGHT PANEL - FORM DATA */}
      <div className="w-1/2 overflow-y-auto bg-white">
        <FormPanel 
          data={data} 
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}