import { memo } from 'react';

import type { Athlete } from 'src/features/AthletesTable/types/athletes';
import type { TableColumn } from 'src/types/table';
import { SortDirection } from 'src/constants/sort';

interface Props {
  rows: Athlete[];
  columns: TableColumn<Athlete>[];
  onSort: (key: keyof Athlete) => void;
  sortDir: SortDirection;
  sortKey: keyof Athlete | null;
}

const DataTable = ({ rows, columns, onSort, sortKey, sortDir }: Props) => {
  const sortDirArrow = sortDir === SortDirection.ASC ? '↑' : '↓';

  return (
    <div className="overflow-auto rounded-xl border border-zinc-200">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                onClick={() => onSort(key)}
                key={key}
                className="cursor-pointer px-3 py-2 text-left font-medium"
              >
                {label} {sortKey === key ? sortDirArrow : ''}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map(({ key }) => (
                <td key={key} className="px-3 py-2">
                  {String(row[key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(DataTable);
