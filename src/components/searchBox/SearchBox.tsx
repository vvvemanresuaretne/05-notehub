type Props = { search: string; onSearch: (s: string) => void };
const SearchBox = ({ search, onSearch }: Props) => (
  <input
    type="text"
    placeholder="Пошук..."
    value={search}
    onChange={(e) => onSearch(e.target.value)}
  />
);
export default SearchBox;
