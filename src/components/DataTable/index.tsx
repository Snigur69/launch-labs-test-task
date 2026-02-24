import type { Athlete } from '../../types/athletes.ts';
import type { TableColumn } from '../../types/table.ts';

interface Props {
  rows: Athlete[];
  columns: TableColumn<Athlete>[];
}

const DataTable = ({ rows, columns }: Props) => {
  return (
    <div className="overflow-auto rounded-xl border border-zinc-200">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th key={key} className="cursor-pointer px-3 py-2 text-left font-medium">
                {label} ↑ ↓
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
