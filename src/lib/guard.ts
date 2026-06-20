function hasKeys<K extends PropertyKey>(
  value: unknown,
  keys: K[],
): value is Record<K, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    keys.every((key) => key in value)
  );
}

export { hasKeys };
