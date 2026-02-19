import Section from "../common/Section";
import { IdCard, Image, Lock, NotepadText, Search } from 'lucide-react'

export default function GovernmentIdCard({ data }) {
  const patient = data?.edited_data?.patient_summary?.patient_details || {};
  
  // Mock ID data - in real app, this would come from the data
  const idDetails = {
    type: "Passport",
    idNumber: "P12345678",
    issueDate: "2020-01-15",
    expiryDate: "2030-01-14",
    issuingAuthority: "Government Agency",
    nationality: "American",
    photoUrl: null, // Would be actual image URL
    verified: true,
  };

  return (
    <Section title="Government ID Card">
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-300">
        {/* ID Card Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl"> <IdCard /></span>
            </div>
            <div>
              <h3 className="font-bold text-lg">{idDetails.type}</h3>
              <p className="text-xs text-gray-500">Government Issued ID</p>
            </div>
          </div>
          {idDetails.verified && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span>✓</span> Verified
            </div>
          )}
        </div>

        {/* ID Card Content */}
        <div className="flex gap-6">
          {/* Photo Placeholder */}
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
            {idDetails.photoUrl ? (
              <img src={idDetails.photoUrl} alt="ID Photo" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-center">
                <span className="text-4xl text-gray-400"><Image/></span>
                <p className="text-xs text-gray-400 mt-1">Photo</p>
              </div>
            )}
          </div>

          {/* ID Details */}
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-bold text-lg">{patient.patient_name || "John Doe"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">ID Number</p>
                <p className="font-mono font-medium">{idDetails.idNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Nationality</p>
                <p className="font-medium">{idDetails.nationality}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Issue Date</p>
                <p className="text-sm">{new Date(idDetails.issueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Expiry Date</p>
                <p className={`text-sm ${new Date(idDetails.expiryDate) < new Date() ? 'text-red-600' : 'text-green-600'}`}>
                  {new Date(idDetails.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Issuing Authority</p>
              <p className="text-sm">{idDetails.issuingAuthority}</p>
            </div>
          </div>
        </div>

        {/* Barcode/MRZ Area */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-gray-100 p-3 rounded font-mono text-xs tracking-wider text-center">
            {'<<'} {idDetails.idNumber} {patient.patient_name?.toUpperCase().replace(/\s/g, '<')} {'<<<<<<<'}
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Machine Readable Zone (MRZ)</p>
        </div>

        {/* Security Features */}
        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span><Lock/> Hologram</span>
          <span><Search/> Microprint</span>
          <span> <NotepadText /> UV Feature</span>
        </div>
      </div>
    </Section>
  );
}