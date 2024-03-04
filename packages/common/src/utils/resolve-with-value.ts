export const resolveWithValue = <T>(value: T, ms = 1000) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(value), ms));
