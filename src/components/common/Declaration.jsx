export default function Declaration() {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="font-bold uppercase text-blue-900 text-sm mb-3">
        Declaration
      </h3>
      <p className="text-sm text-gray-700 italic leading-relaxed">
        I hereby declare that the information provided above is true and accurate 
        to the best of my knowledge.
      </p>

      <div className="flex justify-between items-end mt-8">
        <div className="flex flex-col w-2/5">
          <div className="border-b border-gray-400 w-full mb-1"></div>
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Signature
          </span>
        </div>
        
        <div className="flex flex-col w-1/4">
          <div className="border-b border-gray-400 w-full mb-1"></div>
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Date
          </span>
        </div>
      </div>
    </section>
  );
}