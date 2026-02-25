import './App.css';
import useAthletes from './hooks/useAthletes';
import DataTable from './components/DataTable';
import useTableStates from './hooks/useTableStates';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';

function App() {
  const { data } = useAthletes();
  const { rows, columns, onSort, sortKey, sortDir, page, setPage, totalPages, search, setSearch } =
    useTableStates({ data, rowsPerPage: 15 });

  return (
    <div className="w-screen min-h-screen">
      <h1 className="text-2xl font-semibold text-center">Athletes</h1>
      <div className="max-w-xl mx-auto px-4 my-4">
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        onSort={onSort}
        sortKey={sortKey}
        sortDir={sortDir}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default App;
