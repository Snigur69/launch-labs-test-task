export const getUniqueValuesByKey = <T, K extends keyof T>(data: T[], key: K) => {
  return [...new Set(data.map((row) => row[key]))];
};
