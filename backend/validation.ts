export function isValidConfidence(value: unknown): boolean {
  return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 5;
}

export function isNonBlankString(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}