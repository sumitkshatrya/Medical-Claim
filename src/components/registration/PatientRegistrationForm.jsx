import Section from "../common/Section";
import InfoField from "../common/InfoField";
import { Notebook, Shield, Siren, User } from 'lucide-react';


export default function PatientRegistrationForm({ data }) {
  const patient = data?.edited_data?.patient_summary?.patient_details || {};
  const hospitalization = data?.edited_data?.patient_summary?.hospitalization_details || {};

  // Mock registration data
  const registration = {
    registrationNumber: `REG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
    registrationDate: new Date().toISOString().split('T')[0],
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "+1-555-0124",
    },
    insuranceDetails: {
      provider: "HealthCare Insurance Company",
      policyNumber: patient.patient_policy_no || "POL-987654321",
      groupNumber: "GRP-2025-001",
      coverageType: "Family Floater",
    },
    admissionType: hospitalization.type_of_nature_of_treatment || "Emergency",
    referredBy: "Dr. Michael Brown",
    previousVisits: 2,
  };

  return (
    <Section title="Patient Registration Form">
      <div className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">PATIENT REGISTRATION FORM</h3>
              <p className="text-sm opacity-90">Hospital Admission Record</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-90">Reg. Number</p>
              <p className="font-mono font-bold">{registration.registrationNumber}</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Registration Info */}
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
            <InfoField label="Registration Date" value={new Date(registration.registrationDate).toLocaleDateString()} />
            <InfoField label="Admission Type" value={registration.admissionType} />
            <InfoField label="Referred By" value={registration.referredBy} />
          </div>

          {/* Personal Information Section */}
          <div>
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span><User/></span> Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
              <InfoField label="Full Name" value={patient.patient_name} />
              <InfoField label="Date of Birth" value={patient.patient_dob} />
              <InfoField label="Age" value={patient.patient_age} />
              <InfoField label="Gender" value={patient.patient_gender || "Male"} />
              <InfoField label="Mobile Number" value={patient.patient_mobile} />
              <InfoField label="Email Address" value={patient.patient_email} />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
              <span><Siren className="text-red-700 w-5 h-5 "/></span> Emergency Contact
            </h4>
            <div className="grid grid-cols-3 gap-4 bg-orange-50 p-4 rounded-lg">
              <InfoField label="Contact Name" value={registration.emergencyContact.name} />
              <InfoField label="Relationship" value={registration.emergencyContact.relationship} />
              <InfoField label="Phone Number" value={registration.emergencyContact.phone} />
            </div>
          </div>

          {/* Insurance Information */}
          <div>
            <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
              <span><Shield/></span> Insurance Details
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
              <InfoField label="Insurance Provider" value={registration.insuranceDetails.provider} />
              <InfoField label="Policy Number" value={registration.insuranceDetails.policyNumber} />
              <InfoField label="Group Number" value={registration.insuranceDetails.groupNumber} />
              <InfoField label="Coverage Type" value={registration.insuranceDetails.coverageType} />
            </div>
          </div>

          {/* Medical History */}
          <div>
            <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
              <span><Notebook/></span> Medical History
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-purple-50 p-4 rounded-lg">
              <InfoField label="Previous Visits" value={registration.previousVisits} />
              <InfoField label="Known Allergies" value={patient.allergies || "None reported"} />
              <InfoField label="Blood Group" value={patient.bloodGroup || "A+"} />
              <InfoField label="Chronic Conditions" value={patient.chronicConditions || "None"} />
            </div>
          </div>

          {/* Declaration */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" checked disabled />
              <div>
                <p className="text-sm text-gray-700">
                  I hereby declare that the information provided in this registration form is true, 
                  complete, and accurate to the best of my knowledge. I understand that any false 
                  information may result in denial of services or claim.
                </p>
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Patient/Guardian Signature</p>
                    <div className="mt-2 w-48 h-8 border-b border-gray-400"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <div className="mt-2 w-32 h-8 border-b border-gray-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Section */}
          <div className="text-xs text-gray-400 border-t pt-4 mt-4">
            <p>Registered by: {registration.receivedBy || "Registration Desk"}</p>
            <p>Timestamp: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}