import { useState } from "react";
import Section from "../common/Section";
import { formatCurrency } from "../../utils/formatters";

export default function AuditIssues({ data }) {
  const [activeTab, setActiveTab] = useState("medical");
  const audit = data?.audit_analysis || {};

  const tabs = [
    { id: "medical", label: "Medical Legibility", count: audit.medical_legibility_issues },
    { id: "policy", label: "Policy Violations", count: audit.policy_violations_count },
    { id: "icd", label: "ICD Codes", count: audit.icd_codes?.length },
  ];

  const renderMedicalIssues = () => {
    const issues = audit.medical_legibility?.flagged_items || [];
    
    if (issues.length === 0) {
      return <p className="text-gray-500 text-center py-4">No medical legibility issues found</p>;
    }

    return (
      <div className="space-y-3">
        {issues.map((issue, index) => (
          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
            <div className="flex justify-between">
              <span className="font-medium text-sm">{issue.item_name}</span>
              <span className="text-xs text-gray-500">Bill: {issue.bill_id?.slice(0,8)}</span>
            </div>
            <p className="text-xs text-red-600 mt-1">{issue.flag_reason}</p>
            <p className="text-xs text-gray-600 mt-1">Recommendation: {issue.recommendation}</p>
          </div>
        ))}
        
        {audit.medical_legibility?.summary && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">{audit.medical_legibility.summary}</p>
          </div>
        )}
      </div>
    );
  };

  const renderPolicyViolations = () => {
    const violations = audit.policy_violations || [];
    
    if (violations.length === 0) {
      return <p className="text-gray-500 text-center py-4">No policy violations found</p>;
    }

    return (
      <div className="space-y-3">
        {violations.map((violation, index) => (
          <div key={index} className="bg-red-50 border-l-4 border-red-400 p-3">
            <div className="flex justify-between">
              <span className="font-medium text-sm">{violation.item_name}</span>
              <span className="text-xs font-bold text-red-600">
                {formatCurrency(violation.amount_impacted)}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{violation.rule_name}</p>
            <p className="text-xs text-gray-500 mt-1">{violation.violation_details}</p>
            <p className="text-xs text-blue-600 mt-1">Recommendation: {violation.recommendation}</p>
          </div>
        ))}
        
        {audit.policy_remarks && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-700">{audit.policy_remarks}</p>
          </div>
        )}
      </div>
    );
  };

  const renderICDCodes = () => {
    const codes = audit.icd_codes || [];
    
    if (codes.length === 0) {
      return <p className="text-gray-500 text-center py-4">No ICD codes found</p>;
    }

    return (
      <div className="space-y-3">
        {codes.map((code, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-blue-600">{code.code}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                code.type === 'primary' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {code.type}
              </span>
            </div>
            <p className="text-sm mt-1">{code.description}</p>
            <p className="text-xs text-gray-500 mt-1">Source: {code.source}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section title="Audit Analysis">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
        {activeTab === "medical" && renderMedicalIssues()}
        {activeTab === "policy" && renderPolicyViolations()}
        {activeTab === "icd" && renderICDCodes()}
      </div>

      {/* Validation Scores */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-semibold mb-2">Validation Scores</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Bills Score:</span>
            <span className="float-right font-bold">{audit.validation_scores?.bills_score || 0}%</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Claim Amount Score:</span>
            <span className="float-right font-bold">{audit.validation_scores?.claimed_amount_score || 0}%</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Categorization Score:</span>
            <span className="float-right font-bold">{audit.validation_scores?.categorization_score || 0}%</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Amount Difference:</span>
            <span className="float-right font-bold text-red-600">
              {formatCurrency(audit.validation_scores?.amount_difference || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Review Notes */}
      {data?.review_notes && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            <span className="font-bold">Review Note:</span> {data.review_notes}
          </p>
        </div>
      )}
    </Section>
  );
}