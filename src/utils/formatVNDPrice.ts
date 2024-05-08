/**
 * Formats a given number as a VND price with a period separator.
 * @param amount - The numeric value to be formatted.
 * @returns A string formatted with the period separator every three digits.
 */
export function formatVNDPrice(amount: number): string {
  // Create an instance of NumberFormat to format numbers in VND style
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Fixed to 0 decimal places
    maximumFractionDigits: 0,
  });

  // Use formatter to convert the input amount to a VND formatted string
  return formatter.format(amount).replace(/\s₫$/, ""); // Remove the currency symbol if not needed
}
