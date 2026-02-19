import Section from "../common/Section";
import { formatCurrency } from "../../utils/formatters";
import { Coins, Smartphone } from 'lucide-react';

export default function CashReceipt({ data }) {
  const hospitalization = data?.edited_data?.patient_summary?.hospitalization_details || {};
  
  // Mock receipt data
  const receipt = {
    receiptNumber: "RCPT-2025-001",
    date: new Date().toISOString().split('T')[0],
    amount: hospitalization.claimed_amount || 450.00,
    paymentMode: "Cash",
    receivedFrom: data?.edited_data?.patient_summary?.patient_details?.patient_name || "John Smith",
    purpose: "Medical Claim Processing Fee",
    receivedBy: "Cashier #123",
    department: "Claims Department",
    items: [
      { description: "Claim Processing Fee", amount: 100.00 },
      { description: "Document Verification", amount: 50.00 },
      { description: "Medical Review", amount: 300.00 },
    ]
  };

  return (
    <Section title="Cash Receipt">
      <div className="bg-white border-2 border-green-300 rounded-xl overflow-hidden">
        {/* Receipt Header */}
        <div className="bg-green-600 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">CASH RECEIPT</h3>
              <p className="text-sm opacity-90">Official Payment Receipt</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-90">Receipt No.</p>
              <p className="font-mono font-bold">{receipt.receiptNumber}</p>
            </div>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6">
          {/* Date and Amount Summary */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium">{new Date(receipt.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(receipt.amount)}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Received From</p>
              <p className="font-medium">{receipt.receivedFrom}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Payment Mode</p>
              <p className="font-medium flex items-center gap-1">
                <span> <Coins /></span> {receipt.paymentMode}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Purpose</p>
              <p className="font-medium">{receipt.purpose}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Received By</p>
              <p className="font-medium">{receipt.receivedBy}</p>
            </div>
          </div>

          {/* Itemized List */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2 text-gray-700">Payment Breakdown</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600">Description</th>
                  <th className="text-right py-2 text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2">{item.description}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="py-2 text-gray-700">Total</td>
                  <td className="py-2 text-right text-green-600">{formatCurrency(receipt.amount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Department: {receipt.department}</p>
                <p className="text-xs text-gray-400 mt-1">This is a computer generated receipt</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Authorized Signature</p>
                <div className="mt-2 w-32 h-8 border-b border-gray-400"></div>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-4 flex justify-end">
            <div className="w-16 h-16 bg-gray-100 border-2 border-gray-300 rounded flex items-center justify-center">
              <span className="text-2xl"><Smartphone/></span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}