import type { Dispatch, SetStateAction } from 'react';

import type { Athlete } from 'src/types/athletes';
import { FILTER_KEYS } from 'src/constants/table';

interface Props {
  filters: Record<keyof Athlete, string>;
  filterOptions: Record<keyof Athlete, Athlete[keyof Athlete][]>;
  setFilters: Dispatch<SetStateAction<Record<keyof Athlete, string>>>;
}

const Filters = ({ filters, filterOptions, setFilters }: Props) => {
  return (
    <>
      {FILTER_KEYS.map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-xs mb-1 capitalize">{key}</label>

          <select
            value={filters[key]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
          >
            <option value="">All {key}</option>
            {filterOptions[key].map((value) => (
              <option key={String(value)} value={String(value)}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
};

export default Filters;
