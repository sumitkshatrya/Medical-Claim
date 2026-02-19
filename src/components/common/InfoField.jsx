export default function InfoField({ 
  label, 
  value, 
  format = "text",
  highlight = false,
  className = ""
}) {
  const formatValue = (val) => {
    if (val === undefined || val === null || val === "") return "-";
    
    switch (format) {
      case "currency":
        return `$${Number(val).toFixed(2)}`;
      case "date":
        return new Date(val).toLocaleDateString();
      default:
        return val;
    }
  };

  return (
    <div className={className}>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`font-medium break-words ${
        highlight ? "text-red-600 font-bold" : "text-gray-900"
      }`}>
        {formatValue(value)}
      </p>
    </div>
  );
}