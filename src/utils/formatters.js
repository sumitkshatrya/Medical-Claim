
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "-";
  return `$${Number(value).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString();
};

export const formatTitle = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// New formatters
export const formatAccountNumber = (accNo) => {
  if (!accNo) return "-";
  const str = accNo.toString();
  return '••••' + str.slice(-4);
};

export const formatIFSC = (ifsc) => {
  return ifsc || "-";
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return "-";
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const formatPolicyNumber = (policy) => {
  if (!policy) return "-";
  return policy;
};

export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};