import {
  arrayToObject,
  isDefined,
  sorter,
  deleteKeyFromObject,
} from "./helpers";

type ValidKey<T, Key extends keyof T> = T[Key] extends string ? T[Key] : never;

export class Enty<T, Key extends keyof T> {
  private allIds: T[Key][];
  private byId: Record<Key, T>;
  private keyField: Key;

  constructor(allIds: T[Key][], byId: Record<Key, T>, key: Key) {
    this.allIds = allIds;
    this.byId = byId;
    this.keyField = key;
  }

  get length(): number {
    return this.allIds.length;
  }

  get elements(): T[] {
    return this.allIds.map((id) => this.getById(id) as T).filter(isDefined);
  }

  get ids(): T[Key][] {
    return this.allIds;
  }

  getById(id: T[Key], ...ids: T[Key][]): T[] | T | undefined {
    if (ids.length === 0) {
      return this.byId[(id as unknown) as Key];
    }
    return [id, ...ids].map(
      (providedId) => this.byId[(providedId as unknown) as Key]
    );
  }

  sortByElement(sortFunc: (a: T, b: T) => boolean): Enty<T, Key> {
    const copy = [...this.elements];
    const sortedIds = copy
      .sort(sorter(sortFunc))
      .map((element) => element[this.keyField]);
    return new Enty(sortedIds, this.byId, this.keyField);
  }

  sortById(sortFunc: (a: T[Key], b: T[Key]) => boolean): Enty<T, Key> {
    const copy = [...this.ids];
    const sortedIds = copy.sort(sorter(sortFunc));
    return new Enty(sortedIds, this.byId, this.keyField);
  }

  addOrOverride(element: T): Enty<T, Key> {
    return new Enty(
      [...this.ids, element[this.keyField]],
      {
        ...this.byId,
        [element[this.keyField] as ValidKey<T, Key>]: element,
      },
      this.keyField
    );
  }

  add(element: T): Enty<T, Key> {
    if (this.allIds.indexOf(element[this.keyField]) !== -1) return this;
    return this.addOrOverride(element);
  }

  update(element: T): Enty<T, Key> {
    if (this.allIds.indexOf(element[this.keyField]) === -1) return this;
    return this.addOrOverride(element);
  }

  filter(predicate: (element: T) => boolean): Enty<T, Key> {
    const elements = this.elements.filter(predicate);
    const elementsIds = elements.map((element) => element[this.keyField]);
    const { byId } = arrayToObject(elements, this.keyField);
    return new Enty(elementsIds, byId, this.keyField);
  }

  remove(id: T[Key]): Enty<T, Key> {
    const allIds = this.allIds.filter((savedId) => savedId !== id);
    const byId = deleteKeyFromObject(
      (this.byId as unknown) as T,
      (id as unknown) as Key
    );
    return new Enty(allIds, (byId as unknown) as Record<Key, T>, this.keyField);
  }

  map<U extends Record<Key, T[Key]>>(mapFunc: (element: T) => U): Enty<U, Key> {
    const { byId } = arrayToObject<U, Key>(
      this.elements.map(mapFunc),
      this.keyField
    );
    return new Enty<U, Key>(
      (this.allIds as unknown) as U[Key][],
      byId,
      this.keyField
    );
  }
}
