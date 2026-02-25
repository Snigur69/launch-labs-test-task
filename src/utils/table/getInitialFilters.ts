export const getInitialFilters = (filterKeys: string[]) => {
  return filterKeys.reduce(
    (acc, key) => {
      acc[key] = '';

      return acc;
    },
    {} as Record<string, string>,
  );
};
