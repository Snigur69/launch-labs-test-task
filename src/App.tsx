import './App.css';
import useAthletes from './hooks/useAthletes';
import DataTable from './components/DataTable';
import useTableStates from './hooks/useTableStates';

function App() {
  const { data } = useAthletes();
  const { rows, columns } = useTableStates({ data });

  return (
    <div className="w-screen">
      <h1 className="text-2xl font-semibold text-center">Athletes</h1>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
}

export default App;
