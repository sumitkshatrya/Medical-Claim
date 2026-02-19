import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register font (optional)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica-neue/' }
  ]
});

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
  badge: {
    padding: '2 4',
    borderRadius: 2,
    fontSize: 8,
  },
  badgeNME: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  badgeApproved: {
    backgroundColor: '#dcfce7',
    color: '#166534',
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

export default function ClaimAuditPDF({ data }) {
  if (!data) return null;

  const patient = data?.edited_data?.patient_summary?.patient_details || {};
  const hospitalization = data?.edited_data?.patient_summary?.hospitalization_details || {};
  const audit = data?.audit_analysis || {};
  const bills = data?.edited_data?.nme_analysis?.bills || [];

  return (
    <Document>
      {/* Page 1: Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Medical Claim Audit Report</Text>
          <Text style={styles.subtitle}>Claim ID: {data.claim_id || 'N/A'}</Text>
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
            <Text style={styles.label}>Policy No:</Text>
            <Text style={styles.value}>{patient.patient_policy_no || 'N/A'}</Text>
          </View>
        </View>

        {/* Claim Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Claim Summary</Text>
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
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{audit.status || 'N/A'}</Text>
          </View>
        </View>

        {/* Hospitalization Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hospitalization Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Admission:</Text>
            <Text style={styles.value}>{hospitalization.doa || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Discharge:</Text>
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
        </View>

        {/* Audit Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audit Statistics</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Bills Analyzed:</Text>
            <Text style={styles.value}>{audit.bills_analyzed || 0}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Duplicates Found:</Text>
            <Text style={styles.value}>{audit.duplicates_found || 0}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Medical Issues:</Text>
            <Text style={styles.value}>{audit.medical_legibility_issues || 0}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Policy Violations:</Text>
            <Text style={styles.value}>{audit.policy_violations_count || 0}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          This is a computer-generated document. Page 1 of {bills.length + 1}
        </Text>
      </Page>

      {/* Additional pages for bills */}
      {bills.map((billData, index) => (
        <Page key={billData.bill.bill_id} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Bill Details - Page {index + 2}</Text>
            <Text style={styles.subtitle}>
              {billData.bill.facility_details?.name} | Invoice: {billData.bill.invoice_number}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Bill Date:</Text>
              <Text style={styles.value}>{billData.bill.bill_date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Net Amount:</Text>
              <Text style={styles.value}>${billData.bill.net_amount?.toFixed(2)}</Text>
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
              <Text style={styles.col5}>Status</Text>
            </View>

            {billData.items.map((item) => (
              <View key={`${billData.bill.bill_id}-${item['s.no.']}`} style={styles.tableRow}>
                <Text style={styles.col1}>{item['s.no.']}</Text>
                <Text style={styles.col2}>{item.item_name}</Text>
                <Text style={styles.col3}>{item.category}</Text>
                <Text style={styles.col4}>${item.final_amount?.toFixed(2)}</Text>
                <Text style={[styles.col5, item.is_nme ? styles.badgeNME : styles.badgeApproved]}>
                  {item.is_nme ? 'NME' : 'OK'}
                </Text>
              </View>
            ))}

            <View style={[styles.tableRow, { backgroundColor: '#f3f4f6', fontWeight: 'bold' }]}>
              <Text style={styles.col1}></Text>
              <Text style={styles.col2}>Total</Text>
              <Text style={styles.col3}></Text>
              <Text style={styles.col4}>
                ${billData.items.reduce((sum, item) => sum + (item.final_amount || 0), 0).toFixed(2)}
              </Text>
              <Text style={styles.col5}></Text>
            </View>
          </View>

          <Text style={styles.footer}>
            Page {index + 2} of {bills.length + 1}
          </Text>
        </Page>
      ))}
    </Document>
  );
}