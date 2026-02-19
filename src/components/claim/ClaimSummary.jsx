import Section from "../common/Section";
import InfoField from "../common/InfoField";

export default function ClaimSummary({ data }) {
  const audit = data?.audit_analysis || {};
  const claimId = data?.claim_id;
  const claimType = data?.claim_type;

  return (
    <Section title="Claim Details">
      <div className="grid grid-cols-2 gap-4">
        <InfoField label="Claim ID" value={claimId} />
        <InfoField label="Type" value={claimType} />
        <InfoField label="Status" value={audit.status} />
        <InfoField 
          label="Claimed Amount" 
          value={audit.original_claimed_amount}
          format="currency"
        />
        <InfoField 
          label="Total Bills" 
          value={audit.true_total_of_bills}
          format="currency"
        />
        <InfoField 
          label="Discrepancy" 
          value={audit.discrepancy_amount}
          format="currency"
          highlight={audit.discrepancy_amount > 0}
        />
      </div>
      
      {audit.discrepancy_reason && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {audit.discrepancy_reason}
        </p>
      )}
    </Section>
  );
}