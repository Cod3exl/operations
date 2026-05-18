export function formatINR(amount) {
  if (amount === null || amount === undefined || amount === 0) return '₹0';
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const hasDecimal = absAmount % 1 !== 0;

  let formatted;
  if (hasDecimal) {
    const [intPart, decPart] = absAmount.toFixed(2).split('.');
    formatted = formatIndianNumber(intPart) + '.' + decPart;
  } else {
    formatted = formatIndianNumber(String(Math.floor(absAmount)));
  }
  return (isNegative ? '-' : '') + '₹' + formatted;
}

function formatIndianNumber(numStr) {
  if (numStr.length <= 3) return numStr;
  const last3 = numStr.slice(-3);
  const rest = numStr.slice(0, -3);
  const groups = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return groups + ',' + last3;
}
