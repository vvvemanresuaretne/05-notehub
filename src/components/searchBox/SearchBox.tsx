import React from 'react'
import css from './SearchBox.module.css'

interface Props {
  search: string
  onSearch: (s: string) => void
}

const SearchBox: React.FC<Props> = ({ search, onSearch }) => (
  <input
    type="text"
    value={search}
    placeholder="Search notes"
    onChange={(e) => onSearch(e.target.value)}
    className={css.input}
  />
)

export default SearchBox