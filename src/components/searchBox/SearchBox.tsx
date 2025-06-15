// src/components/SearchBox.tsx
import React from 'react'
import css from './SearchBox.module.css'

type Props = {
  search: string
  onSearch: (s: string) => void
}

const SearchBox: React.FC<Props> = ({ search, onSearch }) => (
  <input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={search}
    onChange={(e) => onSearch(e.target.value)}
  />
)

export default SearchBox
