import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Athlete } from 'src/types/athletes';
import { FILTER_KEYS, SEARCH_KEYS, SortDirection, TABLE_COLUMNS } from 'src/constants/table';
import useDebounce from 'src/hooks/useDebounce';
import { getFilterOptions, getInitialFilters } from 'src/utils/table';

interface Props {
  data: Athlete[];
  rowsPerPage: number;
}

const useTableStates = ({ data, rowsPerPage }: Props) => {
  const [sortKey, setSortKey] = useState<keyof Athlete | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.ASC);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState(getInitialFilters(FILTER_KEYS));

  const filterOptions = useMemo(() => getFilterOptions(data, FILTER_KEYS), [data]);

  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      FILTER_KEYS.every((key) => {
        const selectedValue = filters[key];

        if (!selectedValue) return true;

        return String(row[key]) === selectedValue;
      }),
    );
  }, [data, filters]);

  const searchedRows = useMemo(() => {
    const string = debouncedSearch.trim().toLowerCase();

    if (!string) return filteredRows;

    return filteredRows.filter((row) =>
      SEARCH_KEYS.some((key) => String(row[key]).toLowerCase().includes(string)),
    );
  }, [filteredRows, debouncedSearch]);

  const sortedRows = useMemo(() => {
    if (!sortKey) return searchedRows;

    return [...searchedRows].sort((first, second) => {
      const fistValue = first[sortKey];
      const secondValue = second[sortKey];

      if (typeof fistValue === 'number' && typeof secondValue === 'number') {
        return sortDir === SortDirection.ASC ? fistValue - secondValue : secondValue - fistValue;
      }

      return sortDir === SortDirection.ASC
        ? String(fistValue).localeCompare(String(secondValue))
        : String(secondValue).localeCompare(String(fistValue));
    });
  }, [searchedRows, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  const onSort = useCallback(
    (key: keyof Athlete) => {
      if (sortKey === key) {
        setSortDir((prev) => (prev === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC));
      } else {
        setSortKey(key);
        setSortDir(SortDirection.ASC);
      }
    },
    [sortKey],
  );

  const onReset = () => {
    setFilters(getInitialFilters(FILTER_KEYS));
    setPage(1);
    setSearch('');
    setSortKey(null);
    setSortDir(SortDirection.ASC);
  };

  useEffect(() => {
    setPage(1);
  }, [sortKey, sortDir, debouncedSearch, filters]);

  return {
    columns: TABLE_COLUMNS,
    rows: paginatedRows,
    onSort,
    sortDir,
    sortKey,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    filterOptions,
    filters,
    setFilters,
    onReset,
  };
};

export default useTableStates;
