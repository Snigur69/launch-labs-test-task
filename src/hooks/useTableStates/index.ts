import { useCallback, useEffect, useMemo, useState } from 'react';

import { TABLE_COLUMNS } from '../../constants/table/columns.ts';
import type { Athlete } from '../../types/athletes.ts';
import { SEARCH_KEYS, SortDirection } from '../../constants/table/table.ts';
import useDebounce from '../useDebounce';

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

  const searchedRows = useMemo(() => {
    const string = debouncedSearch.trim().toLowerCase();

    if (!string) return data;

    return data.filter((row) =>
      SEARCH_KEYS.some((key) => String(row[key]).toLowerCase().includes(string)),
    );
  }, [data, debouncedSearch]);

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
        setSortDir(sortDir === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
      } else {
        setSortKey(key);
        setSortDir(SortDirection.ASC);
      }
    },
    [sortDir, sortKey],
  );

  useEffect(() => {
    setPage(1);
  }, [sortKey, sortDir, debouncedSearch]);

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
  };
};

export default useTableStates;
