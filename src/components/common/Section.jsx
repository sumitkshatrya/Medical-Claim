export default function Section({ title, children, className = "" }) {
  return (
    <section className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-200 ${className}`}>
      <h2 className="font-semibold text-lg mb-4 text-gray-800">
        {title}
      </h2>
      {children}
    </section>
  );
}