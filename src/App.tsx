import './App.css';
import useAthletes from './hooks/useAthletes';
import DataTable from './components/DataTable';
import useTableStates from './hooks/useTableStates';

function App() {
  const { data } = useAthletes();
  const { rows, columns, onSort, sortKey, sortDir } = useTableStates({ data });

  return (
    <div className="w-screen min-h-screen">
      <h1 className="text-2xl font-semibold text-center">Athletes</h1>
      <DataTable
        rows={rows}
        columns={columns}
        onSort={onSort}
        sortKey={sortKey}
        sortDir={sortDir}
      />
    </div>
  );
}

export default App;
