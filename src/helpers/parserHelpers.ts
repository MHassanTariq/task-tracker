export function getObjectFromString<T>(str: string | null) {
  try {
    if (str === null) return undefined;
    return JSON.parse(str) as T;
  } catch (err) {
    return undefined;
  }
}
