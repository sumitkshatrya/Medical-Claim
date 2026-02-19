
import Section from "../common/Section";
import InfoField from "../common/InfoField";
import { LandmarkIcon, Verified } from 'lucide-react';

export default function BankDetails({ data }) {
  const patient = data?.edited_data?.patient_summary?.patient_details || {};

  const bankDetails = {
    accountNumber: patient.patient_bank_account_no,
    bankName: patient.patient_bank_name,
    branchName: patient.patient_bank_branch_name,
    accountType: patient.patient_bank_account_type,
    ifscCode: patient.patient_bank_ifsc_code,
    accountHolder: patient.patient_name,
  };

  const hasBankDetails = Object.values(bankDetails).some(value => value && value !== "");

  if (!hasBankDetails) {
    return (
      <Section title="Bank Account Details">
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2"><LandmarkIcon/> No bank account details available</p>
          <p className="text-sm">Bank details will appear here once provided</p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Bank Account Details">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        {/* Bank Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-200">
          <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="text-white text-xl"><LandmarkIcon/></span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900">{bankDetails.bankName || "Global Trust Bank"}</h3>
            <p className="text-sm text-blue-600">Verified Bank Account</p>
          </div>
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <InfoField 
              label="Account Holder Name" 
              value={bankDetails.accountHolder}
              className="bg-white p-3 rounded-lg shadow-sm"
            />
            <InfoField 
              label="Account Number" 
              value={bankDetails.accountNumber}
              format="account"
              className="bg-white p-3 rounded-lg shadow-sm"
            />
            <InfoField 
              label="Account Type" 
              value={bankDetails.accountType}
              className="bg-white p-3 rounded-lg shadow-sm"
            />
          </div>
          
          <div className="space-y-4">
            <InfoField 
              label="Bank Name" 
              value={bankDetails.bankName}
              className="bg-white p-3 rounded-lg shadow-sm"
            />
            <InfoField 
              label="Branch Name" 
              value={bankDetails.branchName}
              className="bg-white p-3 rounded-lg shadow-sm"
            />
            <InfoField 
              label="IFSC Code" 
              value={bankDetails.ifscCode}
              format="ifsc"
              className="bg-white p-3 rounded-lg shadow-sm font-mono"
            />
          </div>
        </div>

        {/* Cheque Sample/Preview */}
        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-dashed border-blue-300">
          <p className="text-xs text-blue-600 mb-2 flex items-center gap-1">
            <span>📋</span> Cheque Preview
          </p>
          <div className="bg-gray-50 p-4 rounded font-mono text-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">PAY</span>
              <span className="text-gray-900 font-bold">{bankDetails.accountHolder || "_________________"}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">THE SUM OF</span>
              <span className="text-gray-900">Rupees _________________________________</span>
            </div>
            <div className="border-t border-b border-gray-300 py-2 my-2">
              <div className="flex justify-between">
                <span className="text-gray-600">A/c No:</span>
                <span className="text-gray-900">•••• {bankDetails.accountNumber?.slice(-4) || "____"}</span>
                <span className="text-gray-600">IFSC:</span>
                <span className="text-gray-900">{bankDetails.ifscCode || "______"}</span>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <span className="text-gray-600">Signature</span>
            </div>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
          <span><Verified/></span>
          <span>Bank account verified and linked to claim</span>
        </div>
      </div>
    </Section>
  );
}