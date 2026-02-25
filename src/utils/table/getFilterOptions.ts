import { getUniqueValuesByKey } from './getUniqueValuesByKey.ts';

export const getFilterOptions = <T, K extends keyof T>(
  data: T[],
  filterKeys: K[],
): Record<K, T[K][]> => {
  return filterKeys.reduce(
    (acc, key) => {
      acc[key] = getUniqueValuesByKey(data, key);

      return acc;
    },
    {} as Record<K, T[K][]>,
  );
};
