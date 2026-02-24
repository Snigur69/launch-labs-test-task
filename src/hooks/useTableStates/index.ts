import { TABLE_COLUMNS } from '../../constants/table/columns.ts';
import type { Athlete } from '../../types/athletes.ts';

interface Props {
  data: Athlete[];
}

const useTableStates = ({ data }: Props) => {
  return {
    columns: TABLE_COLUMNS,
    rows: data,
  };
};

export default useTableStates;
