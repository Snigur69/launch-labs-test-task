import { useMemo, useState } from 'react';

import { TABLE_COLUMNS } from '../../constants/table/columns.ts';
import type { Athlete } from '../../types/athletes.ts';
import { SortDirection } from '../../constants/table/sort.ts';

interface Props {
  data: Athlete[];
  rowsPerPage: number;
}

const useTableStates = ({ data, rowsPerPage }: Props) => {
  const [sortKey, setSortKey] = useState<keyof Athlete | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.ASC);
  const [page, setPage] = useState<number>(1);

  const sortedRows = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((first, second) => {
      const fistValue = first[sortKey];
      const secondValue = second[sortKey];

      if (typeof fistValue === 'number' && typeof secondValue === 'number') {
        return sortDir === SortDirection.ASC ? fistValue - secondValue : secondValue - fistValue;
      }

      return sortDir === SortDirection.ASC
        ? String(fistValue).localeCompare(String(secondValue))
        : String(secondValue).localeCompare(String(fistValue));
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  const onSort = (key: keyof Athlete) => {
    setPage(1);
    if (sortKey === key) {
      setSortDir(sortDir === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      setSortKey(key);
      setSortDir(SortDirection.ASC);
    }
  };

  return {
    columns: TABLE_COLUMNS,
    rows: paginatedRows,
    onSort,
    sortDir,
    sortKey,
    page,
    setPage,
    totalPages,
  };
};

export default useTableStates;
