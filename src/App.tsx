import DataTable from 'src/components/DataTable';
import Pagination from 'src/components/Pagination';
import SearchInput from 'src/components/SearchInput';
import Filters from 'src/components/Filters';
import Loader from 'src/components/Loader';
import ErrorState from 'src/components/ErrorState';
import useAthletes from 'src/hooks/useAthletes';
import useTableStates from 'src/hooks/useTableStates';

import 'src/App.css';

function App() {
  const { data, loading, error } = useAthletes();
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
  } = useTableStates({ data, rowsPerPage: 10 });

  const renderTable = () => {
    if (loading) return <Loader />;

    if (error) return <ErrorState error={error} />;

    return (
      <>
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
        {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
      </>
    );
  };

  return (
    <div className="w-screen min-h-screen">
      <h1 className="text-2xl font-semibold text-center">Athletes</h1>
      {renderTable()}
    </div>
  );
}

export default App;
