import { Enty } from "./enty";
import { SortFunction } from "./types";

export function isDefined<T>(element: T | undefined): element is T {
  return element !== undefined;
}

export const sorter = <T>(func: SortFunction<T>) => (a: T, b: T): 1 | -1 | 0 =>
  func(a, b) ? 1 : func(b, a) ? -1 : 0;

export const descending = <T>(key: keyof T): SortFunction<T> => (a: T, b: T) => a[key] < b[key];
export const ascending = <T>(key: keyof T): SortFunction<T> => (a: T, b: T) => a[key] > b[key];

export const enty = <T, Key extends keyof T>(
  objectsArray: T[],
  keyField: Key
) => {
  const { allIds, byId } = arrayToObject(objectsArray, keyField);
  return new Enty<T, Key>(allIds, byId, keyField);
};

export const arrayToObject = <T, Key extends keyof T>(
  objectsArray: T[],
  keyField: Key
) => {
  const allIds = objectsArray.map((element) => element[keyField]);
  const byId = objectsArray.reduce<Record<Key, T>>(
    (acc, element) => ({ ...acc, [element[keyField] as any]: element }),
    {} as Record<Key, T>
  );
  return { allIds, byId };
};

export const deleteKeyFromObject = <T>(
  object: T extends Record<keyof T, unknown> ? T : never,
  keyToDelete: keyof T
): Omit<T, keyof T> => {
  const { [keyToDelete]: _, ...newObj } = object;
  return newObj;
};
