export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]) =>
  Object.fromEntries(keys.map((k) => [k, obj[k]])) as Pick<T, K>;

export const filter = Function.call.bind(Array.prototype.filter);
export const map = Function.call.bind(Array.prototype.map);

export type Entry<T extends object, K extends keyof T> = [K, T[K]];
