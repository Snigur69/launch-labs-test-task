interface Props {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput = ({ search, setSearch }: Props) => (
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search..."
    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
  />
);

export default SearchInput;
