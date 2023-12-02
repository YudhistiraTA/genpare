export function capitalizeAll(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
