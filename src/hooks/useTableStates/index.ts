import { useMemo, useState } from 'react';

import { TABLE_COLUMNS } from '../../constants/table/columns.ts';
import type { Athlete } from '../../types/athletes.ts';
import { SortDirection } from '../../constants/table/sort.ts';

interface Props {
  data: Athlete[];
}

const useTableStates = ({ data }: Props) => {
  const [sortKey, setSortKey] = useState<keyof Athlete | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.ASC);

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

  const onSort = (key: keyof Athlete) => {
    if (sortKey === key) {
      setSortDir(sortDir === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      setSortKey(key);
      setSortDir(SortDirection.ASC);
    }
  };

  return {
    columns: TABLE_COLUMNS,
    rows: sortedRows,
    onSort,
    sortDir,
    sortKey,
  };
};

export default useTableStates;
