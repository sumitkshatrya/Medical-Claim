import { useState } from "react";
import Section from "../common/Section";
import { formatCurrency } from "../../utils/formatters";

export default function BillsSection({ data, setPageNumber }) {
  const [expandedBill, setExpandedBill] = useState(null);
  const bills = data?.edited_data?.nme_analysis?.bills || [];

  const toggleBill = (billId) => {
    setExpandedBill(expandedBill === billId ? null : billId);
  };

  const getTotalByCategory = (items) => {
    return items.reduce((sum, item) => sum + (item.final_amount || 0), 0);
  };

  const getNMECount = (items) => {
    return items.filter(item => item.is_nme).length;
  };

  if (bills.length === 0) {
    return (
      <Section title="Bills">
        <p className="text-gray-500 text-center py-4">No bills available</p>
      </Section>
    );
  }

  return (
    <Section title={`Bills (${bills.length})`}>
      <div className="space-y-4">
        {bills.map((billData, index) => {
          const bill = billData.bill;
          const items = billData.items || [];
          const isExpanded = expandedBill === bill.bill_id;
          const nmeCount = getNMECount(items);
          const totalAmount = getTotalByCategory(items);

          return (
            <div key={bill.bill_id} className="border rounded-lg overflow-hidden">
              {/* Bill Header */}
              <div 
                className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleBill(bill.bill_id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Bill #{index + 1} - {bill.facility_details?.name || "Unknown Facility"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Invoice: {bill.invoice_number} | Date: {bill.bill_date} | Page: {bill.page_number}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {nmeCount > 0 && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                        {nmeCount} NME
                      </span>
                    )}
                    <span className="font-bold text-blue-600">
                      {formatCurrency(bill.net_amount)}
                    </span>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPageNumber?.(bill.page_number);
                      }}
                    >
                      📄
                    </button>
                    <span className="text-gray-400">
                      {isExpanded ? "▼" : "▶"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Items */}
              {isExpanded && (
                <div className="p-4 bg-white border-t">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">S.No</th>
                        <th className="text-left py-2">Item Name</th>
                        <th className="text-left py-2">Category</th>
                        <th className="text-right py-2">Amount</th>
                        <th className="text-center py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr 
                          key={`${bill.bill_id}-${item['s.no.']}`}
                          className={`border-b last:border-0 ${
                            item.is_nme ? 'bg-red-50' : ''
                          }`}
                        >
                          <td className="py-2">{item['s.no.']}</td>
                          <td className="py-2">
                            <div>
                              {item.item_name}
                              {item.is_nme && (
                                <div className="text-xs text-red-600 mt-1">
                                  {item.deduction_reason}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-2">{item.category}</td>
                          <td className="py-2 text-right font-medium">
                            {formatCurrency(item.final_amount)}
                          </td>
                          <td className="py-2 text-center">
                            {item.is_nme ? (
                              <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                NME
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Approved
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold bg-gray-50">
                        <td colSpan="3" className="py-2 text-right">Total:</td>
                        <td className="py-2 text-right">{formatCurrency(totalAmount)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}