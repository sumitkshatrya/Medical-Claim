import Section from "../common/Section";
import InfoField from "../common/InfoField";

export default function PatientInfoField({ data }) {
  const patient = data?.edited_data?.patient_summary?.patient_details;
  const hospitalization = data?.edited_data?.patient_summary?.hospitalization_details;

  if (!patient) return null;

  return (
    <Section title="Patient Information">
      <div className="grid grid-cols-2 gap-4">
        <InfoField label="Patient Name" value={patient.patient_name} />
        <InfoField label="Date of Birth" value={patient.patient_dob} />
        <InfoField label="Age" value={patient.patient_age} />
        <InfoField label="Policy Number" value={patient.patient_policy_no} />
        <InfoField label="Contact Number" value={patient.patient_mobile} />
        <InfoField label="Email" value={patient.patient_email} />
      </div>

      {hospitalization && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium mb-3 text-gray-700">
            Hospitalization Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Admission Date" value={hospitalization.doa} />
            <InfoField label="Discharge Date" value={hospitalization.dod} />
            <InfoField label="Diagnosis" value={hospitalization.provisional_final_diagnosis} />
            <InfoField label="Treating Doctor" value={hospitalization.treating_doctor_name} />
            <InfoField label="Treatment Type" value={hospitalization.nature_of_treatment} />
            <InfoField 
              label="Claimed Amount" 
              value={hospitalization.claimed_amount}
              format="currency"
            />
          </div>
        </div>
      )}
    </Section>
  );
}