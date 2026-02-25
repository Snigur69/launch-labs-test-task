export const getUniqueValuesByKey = <T, K extends keyof T>(data: T[], key: K) => {
  return [...new Set(data.map((row) => row[key]))];
};

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

export const getInitialFilters = (filterKeys: string[]) => {
  return filterKeys.reduce(
    (acc, key) => {
      acc[key] = '';

      return acc;
    },
    {} as Record<string, string>,
  );
};
