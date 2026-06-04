function hasKeys(value: unknown, keys: readonly string[]): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    keys.every((key) => key in value)
  );
}
export { hasKeys };
