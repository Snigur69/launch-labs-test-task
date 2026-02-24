import type { Athlete } from '../../types/athletes.ts';
import type { TableColumn } from '../../types/table.ts';
import { SortDirection } from '../../constants/table/sort.ts';

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
                  {row[key] ? String(row[key]) : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
