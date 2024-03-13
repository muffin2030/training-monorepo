export const resolveWithValue = <T>(value: T, ms = 1000): Promise<T> =>
  new Promise((resolve, reject) => setTimeout(() => resolve(value), ms));
