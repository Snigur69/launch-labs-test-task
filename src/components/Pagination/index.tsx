interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className="flex justify-center items-center gap-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
