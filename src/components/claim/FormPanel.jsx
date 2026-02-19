
import PatientInfoField from "../patient/PatientInfoField";
import ClaimSummary from "./ClaimSummary";
import BillsSection from "../bills/BillsSection";
import AuditIssues from "../audit/AuditIssues";
import DocumentSegments from "../documents/DocumentSegments";
import Declaration from "../common/Declaration";
import BankDetails from "../bank/BankDetails";
import ChequeDetails from "../bank/ChequeDetails";
import GovernmentIdCard from "../identity/GovernmentIdCard";
import CashReceipt from "../receipt/CashReceipt";
import PatientRegistrationForm from "../registration/PatientRegistrationForm";

export default function FormPanel({ data, setPageNumber }) {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        MEDICAL CLAIM FORM
      </h2>

      <PatientInfoField data={data} />
      <ClaimSummary data={data} />
      
      {/* New Components */}
      <BankDetails data={data} />
      <ChequeDetails data={data} />
      <GovernmentIdCard data={data} />
      <CashReceipt data={data} />
      <PatientRegistrationForm data={data} />
      
      <BillsSection data={data} setPageNumber={setPageNumber} />
      <AuditIssues data={data} />
      <DocumentSegments data={data} setPageNumber={setPageNumber} />
      <Declaration />
    </div>
  );
}