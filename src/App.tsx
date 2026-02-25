import './App.css';
import useAthletes from './hooks/useAthletes';
import DataTable from './components/DataTable';
import useTableStates from './hooks/useTableStates';
import Pagination from './components/Pagination';
import SearchInput from './components/SearchInput';
import Filters from './components/Filters';

function App() {
  const { data } = useAthletes();
  const {
    rows,
    columns,
    onSort,
    sortKey,
    sortDir,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    filters,
    setFilters,
    filterOptions,
    onReset,
  } = useTableStates({ data, rowsPerPage: 15 });

  return (
    <div className="w-screen min-h-screen">
      <h1 className="text-2xl font-semibold text-center">Athletes</h1>
      <div className="max-w-xl mx-auto px-4 my-4">
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-4">
        <Filters filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
        <button onClick={onReset}>Reset all</button>
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
