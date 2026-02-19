import Section from "../common/Section";
import { BadgeDollarSign, CoinsIcon, DollarSign} from "lucide-react";

export default function ChequeDetails() {
  // Mock cheque data - in real app, this would come from the data
  const chequeDetails = {
    chequeNumber: "CHQ-2025-001234",
    date: "2025-02-15",
    amount: 450.00,
    bankName: "Global Trust Bank",
    branch: "Main Branch - New York",
    micrCode: "123456789",
    status: "processed",
    issuedTo: "City Medical Center",
    purpose: "Medical Claim Settlement",
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'processed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Section title="Cheque Details">
      <div className="bg-white border-2 border-gray-300 rounded-xl p-6 relative">
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-6xl rotate-[-30deg]">
          <CoinsIcon/>
        </div>

        {/* Cheque Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-300">
          <div>
            <h3 className="font-bold text-xl text-gray-800">{chequeDetails.bankName}</h3>
            <p className="text-sm text-gray-500">{chequeDetails.branch}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Cheque No.</div>
            <div className="font-mono font-bold">{chequeDetails.chequeNumber}</div>
          </div>
        </div>

        {/* Payee Line */}
        <div className="mb-4 flex items-center">
          <span className="w-16 text-gray-600">PAY</span>
          <div className="flex-1 border-b-2 border-gray-300 mx-2 pb-1">
            <span className="font-bold text-lg">{chequeDetails.issuedTo}</span>
          </div>
        </div>

        {/* Amount Line */}
        <div className="mb-4">
          <div className="flex items-center">
            <span className="w-16 text-gray-600">THE SUM OF</span>
            <div className="flex-1 border-b-2 border-gray-300 mx-2 pb-1">
              <span className="font-medium">Rupees {chequeDetails.amount.toFixed(2)} Only</span>
            </div>
          </div>
          <div className="flex justify-end items-center mt-2">
            <span className="text-gray-600 text-sm"><DollarSign className="w-5 h-5 text-gray-700" /></span>
            <span className="font-bold text-xl ml-1">{chequeDetails.amount.toFixed(2)}</span>
          </div>
        </div>

        {/* MICR Line */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          <div className="flex justify-between items-center">
            <div className="font-mono text-sm tracking-wider">
              {chequeDetails.micrCode} • {chequeDetails.chequeNumber} • {new Date(chequeDetails.date).toLocaleDateString()}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(chequeDetails.status)}`}>
              {chequeDetails.status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span>MICR: {chequeDetails.micrCode}</span>
          <span>Date: {new Date(chequeDetails.date).toLocaleDateString()}</span>
        </div>

        {/* Endorsement Section */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Endorsement / For Deposit Only</p>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <p className="text-xs text-gray-400">Account: •••••••1234</p>
          </div>
        </div>
      </div>
    </Section>
  );
}