import { ArrayOrValue } from "~/types/arrayOrValue";

export function toArray<T>(arrayOrValue: ArrayOrValue<T>): T[] {
  if (Array.isArray(arrayOrValue)) {
    return arrayOrValue;
  }

  return [arrayOrValue];
}
