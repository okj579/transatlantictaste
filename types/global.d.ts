type Entry<T extends object, K extends keyof T = keyof T> = [K, T[K]];

interface ObjectConstructor {
  entries: <T extends object>(obj: T) => Entry<T>[];
}
