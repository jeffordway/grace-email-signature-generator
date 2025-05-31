// Phone number formatting utility for consistent (XXX) XXX-XXXX output
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 10);
  if (digits.length > 6) return `(${part1}) ${part2}-${part3}`;
  if (digits.length > 3) return `(${part1}) ${part2}`;
  if (digits.length > 0) return `(${part1}`;
  return "";
}
