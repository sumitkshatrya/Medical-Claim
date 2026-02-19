import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#4b5563',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 5,
    marginBottom: 8,
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: '30%',
    color: '#6b7280',
  },
  value: {
    width: '70%',
    fontWeight: 'medium',
  },
  table: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    padding: 5,
    fontSize: 9,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
    padding: 5,
  },
  col1: { width: '10%' },
  col2: { width: '40%' },
  col3: { width: '25%' },
  col4: { width: '15%', textAlign: 'right' },
  col5: { width: '10%', textAlign: 'center' },
  
  // New styles for additional components
  bankSection: {
    marginBottom: 15,
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 5,
  },
  chequeContainer: {
    marginBottom: 15,
    border: 1,
    borderColor: '#d1d5db',
    padding: 10,
  },
  idCard: {
    marginBottom: 15,
    border: 1,
    borderColor: '#d1d5db',
    padding: 10,
    flexDirection: 'row',
  },
  idPhoto: {
    width: 80,
    height: 80,
    backgroundColor: '#e5e7eb',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idDetails: {
    flex: 1,
  },
  receiptContainer: {
    marginBottom: 15,
    border: 1,
    borderColor: '#22c55e',
    padding: 10,
  },
  registrationForm: {
    marginBottom: 15,
    border: 1,
    borderColor: '#3b82f6',
    padding: 10,
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  gridItem: {
    width: '50%',
    marginBottom: 5,
  },
  badge: {
    padding: '2 4',
    borderRadius: 2,
    fontSize: 8,
    alignSelf: 'flex-start',
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  badgeBlue: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  badgeRed: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  signature: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

const ClaimAuditPDF = ({ data }) => {
  console.log("PDF Data received:", data); 

  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No data available</Text>
        </Page>
      </Document>
    );
  }

  // Extract data from the JSON structure
  const patient = data?.edited_data?.patient_summary?.patient_details || {};
  const hospitalization = data?.edited_data?.patient_summary?.hospitalization_details || {};
  const clinical = data?.edited_data?.patient_summary?.clinical_details || {};
  const audit = data?.audit_analysis || {};
  const bills = data?.edited_data?.nme_analysis?.bills || [];
  const segments = data?.segments?.aggregated_segments || {};

  // Bank details from patient data
  const bankDetails = {
    accountNumber: patient.patient_bank_account_no,
    bankName: patient.patient_bank_name,
    branchName: patient.patient_bank_branch_name,
    accountType: patient.patient_bank_account_type,
    ifscCode: patient.patient_bank_ifsc_code,
    accountHolder: patient.patient_name,
  };

  // Check if bank details exist
  const hasBankDetails = Object.values(bankDetails).some(value => value && value !== "");

  // Get ICD codes
  const icdCodes = audit.icd_codes || [];

  // Get policy violations
  const policyViolations = audit.policy_violations || [];

  // Get medical legibility issues
  const medicalIssues = audit.medical_legibility?.flagged_items || [];

  return (
    <Document>
      {/* Page 1: Summary and Patient Info */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Medical Claim Audit Report</Text>
          <Text style={styles.subtitle}>Claim ID: {data.claim_id || 'N/A'}</Text>
          <Text style={styles.subtitle}>Session ID: {data.session_id || 'N/A'}</Text>
          <Text style={styles.subtitle}>Generated: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{patient.patient_name || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DOB:</Text>
            <Text style={styles.value}>{patient.patient_dob || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{patient.patient_age || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Policy No:</Text>
            <Text style={styles.value}>{patient.patient_policy_no || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{patient.patient_mobile || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{patient.patient_email || 'N/A'}</Text>
          </View>
        </View>

        {/* Hospitalization Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hospitalization Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Admission Date:</Text>
            <Text style={styles.value}>{hospitalization.doa || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Discharge Date:</Text>
            <Text style={styles.value}>{hospitalization.dod || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Diagnosis:</Text>
            <Text style={styles.value}>{hospitalization.provisional_final_diagnosis || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Treating Doctor:</Text>
            <Text style={styles.value}>{hospitalization.treating_doctor_name || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Doctor Reg No:</Text>
            <Text style={styles.value}>{hospitalization.treating_doctor_registration_number || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Treatment Type:</Text>
            <Text style={styles.value}>{hospitalization.nature_of_treatment || clinical?.probable_line_of_treatment || 'N/A'}</Text>
          </View>
        </View>

        {/* Claim Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Claim Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Claim ID:</Text>
            <Text style={styles.value}>{data.claim_id || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Claim Type:</Text>
            <Text style={styles.value}>{data.claim_type || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{data.status || audit.status || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Claimed Amount:</Text>
            <Text style={styles.value}>${audit.original_claimed_amount?.toFixed(2) || '0.00'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Bills:</Text>
            <Text style={styles.value}>${audit.true_total_of_bills?.toFixed(2) || '0.00'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Discrepancy:</Text>
            <Text style={[styles.value, { color: '#dc2626' }]}>
              ${audit.discrepancy_amount?.toFixed(2) || '0.00'}
            </Text>
          </View>
          {audit.discrepancy_reason && (
            <View style={[styles.row, { marginTop: 5 }]}>
              <Text style={styles.label}>Reason:</Text>
              <Text style={[styles.value, { fontSize: 8, color: '#dc2626' }]}>{audit.discrepancy_reason}</Text>
            </View>
          )}
        </View>

        {/* Bank Account Details - Only if available */}
        {hasBankDetails && (
          <View style={styles.bankSection}>
            <Text style={styles.sectionTitle}>Bank Account Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Account Holder:</Text>
              <Text style={styles.value}>{bankDetails.accountHolder || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Account Number:</Text>
              <Text style={styles.value}>
                {bankDetails.accountNumber ? `****${bankDetails.accountNumber.slice(-4)}` : 'N/A'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Bank Name:</Text>
              <Text style={styles.value}>{bankDetails.bankName || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.value}>{bankDetails.branchName || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Account Type:</Text>
              <Text style={styles.value}>{bankDetails.accountType || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>IFSC Code:</Text>
              <Text style={styles.value}>{bankDetails.ifscCode || 'N/A'}</Text>
            </View>
          </View>
        )}

        <Text style={styles.footer}>
          This is a computer-generated document. Page 1 of {bills.length + (icdCodes.length > 0 ? 2 : 1) + (policyViolations.length > 0 ? 1 : 0)}
        </Text>
      </Page>

      {/* Page 2: Audit Issues and ICD Codes */}
      {(medicalIssues.length > 0 || policyViolations.length > 0 || icdCodes.length > 0) && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Audit Analysis</Text>
          </View>

          {/* Medical Legibility Issues */}
          {medicalIssues.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Medical Legibility Issues ({medicalIssues.length})</Text>
              {medicalIssues.map((issue, index) => (
                <View key={index} style={[styles.tableRow, { backgroundColor: '#fff3cd', marginBottom: 3 }]}>
                  <Text style={{ width: '30%', fontSize: 8 }}>{issue.item_name}</Text>
                  <Text style={{ width: '50%', fontSize: 8 }}>{issue.flag_reason}</Text>
                  <Text style={{ width: '20%', fontSize: 8 }}>Bill: {issue.bill_id?.slice(0,6)}</Text>
                </View>
              ))}
              {audit.medical_legibility?.summary && (
                <View style={[styles.row, { marginTop: 5, backgroundColor: '#e7f3ff', padding: 5 }]}>
                  <Text style={{ fontSize: 8 }}>Summary: {audit.medical_legibility.summary}</Text>
                </View>
              )}
            </View>
          )}

          {/* Policy Violations */}
          {policyViolations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Policy Violations ({policyViolations.length})</Text>
              {policyViolations.map((violation, index) => (
                <View key={index} style={[styles.tableRow, { backgroundColor: '#f8d7da', marginBottom: 3 }]}>
                  <Text style={{ width: '25%', fontSize: 8 }}>{violation.item_name}</Text>
                  <Text style={{ width: '45%', fontSize: 8 }}>{violation.rule_name}</Text>
                  <Text style={{ width: '15%', fontSize: 8, textAlign: 'right' }}>${violation.amount_impacted?.toFixed(2)}</Text>
                  <Text style={{ width: '15%', fontSize: 8 }}>S.No: {violation.item_s_no}</Text>
                </View>
              ))}
              {audit.policy_remarks && (
                <View style={[styles.row, { marginTop: 5, backgroundColor: '#f8d7da', padding: 5 }]}>
                  <Text style={{ fontSize: 8 }}>Remarks: {audit.policy_remarks}</Text>
                </View>
              )}
            </View>
          )}

          {/* ICD Codes */}
          {icdCodes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ICD Codes ({icdCodes.length})</Text>
              {icdCodes.map((code, index) => (
                <View key={index} style={[styles.tableRow, { marginBottom: 3 }]}>
                  <Text style={{ width: '15%', fontSize: 8, fontWeight: 'bold' }}>{code.code}</Text>
                  <Text style={{ width: '25%', fontSize: 8 }}>{code.type}</Text>
                  <Text style={{ width: '60%', fontSize: 8 }}>{code.description}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.footer}>
            Page 2 of {bills.length + 2}
          </Text>
        </Page>
      )}

      {/* Page 3: Document Segments */}
      {Object.keys(segments).length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Document Segments</Text>
          </View>

          <View style={styles.section}>
            {Object.entries(segments).map(([docType, value]) => {
              const pageRanges = value?.page_ranges || [];
              if (pageRanges.length === 0) return null;

              return (
                <View key={docType} style={{ marginBottom: 10 }}>
                  <Text style={[styles.sectionTitle, { fontSize: 10 }]}>
                    {docType.replace(/_/g, ' ').toUpperCase()}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 3 }}>
                    {pageRanges.map((range, idx) => (
                      <Text key={idx} style={{ fontSize: 8, marginRight: 5, backgroundColor: '#e9ecef', padding: '2 4' }}>
                        Pages {range.start}-{range.end}
                      </Text>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Review Notes */}
          {data.review_notes && (
            <View style={[styles.section, { backgroundColor: '#fff3cd', padding: 10 }]}>
              <Text style={styles.sectionTitle}>Review Notes</Text>
              <Text style={{ fontSize: 9 }}>{data.review_notes}</Text>
            </View>
          )}

          <Text style={styles.footer}>
            Page 3 of {bills.length + 3}
          </Text>
        </Page>
      )}

      {/* Bill Pages */}
      {bills.map((billData, index) => (
        <Page key={billData.bill.bill_id} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Bill Details - Page {index + 4}</Text>
            <Text style={styles.subtitle}>
              {billData.bill.facility_details?.name} | Invoice: {billData.bill.invoice_number || 'N/A'}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Bill ID:</Text>
              <Text style={styles.value}>{billData.bill.bill_id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Bill Type:</Text>
              <Text style={styles.value}>{billData.bill.bill_type}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Bill Date:</Text>
              <Text style={styles.value}>{billData.bill.bill_date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Net Amount:</Text>
              <Text style={styles.value}>${billData.bill.net_amount?.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Discount:</Text>
              <Text style={styles.value}>${billData.bill.total_discount?.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Page Number:</Text>
              <Text style={styles.value}>{billData.bill.page_number}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>S.No</Text>
              <Text style={styles.col2}>Item Name</Text>
              <Text style={styles.col3}>Category</Text>
              <Text style={styles.col4}>Amount</Text>
              <Text style={styles.col5}>NME</Text>
            </View>

            {billData.items.map((item) => (
              <View key={`${billData.bill.bill_id}-${item['s.no.']}`} style={styles.tableRow}>
                <Text style={styles.col1}>{item['s.no.']}</Text>
                <Text style={styles.col2}>
                  {item.item_name}
                  {item.is_nme && item.nme_item_name && ` (→ ${item.nme_item_name})`}
                </Text>
                <Text style={styles.col3}>{item.category}</Text>
                <Text style={styles.col4}>${item.final_amount?.toFixed(2)}</Text>
                <Text style={[
                  styles.col5,
                  { 
                    color: item.is_nme ? '#991b1b' : '#166534',
                  }
                ]}>
                  {item.is_nme ? 'Yes' : 'No'}
                </Text>
              </View>
            ))}

            {/* Calculate totals */}
            <View style={[styles.tableRow, { backgroundColor: '#f3f4f6', fontWeight: 'bold' }]}>
              <Text style={styles.col1}></Text>
              <Text style={styles.col2}>Subtotal</Text>
              <Text style={styles.col3}></Text>
              <Text style={styles.col4}>
                ${billData.items.reduce((sum, item) => sum + (item.final_amount || 0), 0).toFixed(2)}
              </Text>
              <Text style={styles.col5}></Text>
            </View>

            {/* NME items total */}
            <View style={[styles.tableRow, { backgroundColor: '#fee2e2' }]}>
              <Text style={styles.col1}></Text>
              <Text style={styles.col2}>NME Total</Text>
              <Text style={styles.col3}></Text>
              <Text style={styles.col4}>
                ${billData.items.filter(item => item.is_nme).reduce((sum, item) => sum + (item.final_amount || 0), 0).toFixed(2)}
              </Text>
              <Text style={styles.col5}></Text>
            </View>
          </View>

          <Text style={styles.footer}>
            Page {index + 4} of {bills.length + 3}
          </Text>
        </Page>
      ))}
    </Document>
  );
};

export default ClaimAuditPDF;