
export function isInteger(x: number): boolean {
  return !isFloat(x);
}

export function isFloat(x: number): boolean {
  return !!(x % 1) && !isNaN(x);
}

export function containsFloats(values: number[]): boolean {
  for (let i=0; i<values.length; i++) {
    if (isFloat(values[i])) {
      return true;
    }
  }

  return false;
}

export function isIntegersOnly(values: number[]): boolean {
  return !containsFloats(values);
}