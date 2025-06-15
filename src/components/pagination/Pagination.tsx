
import React from 'react'
import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface Props {
  page: number
  onPageChange: (page: number) => void
  totalItems: number
  perPage: number
}

const Pagination: React.FC<Props> = ({ page, onPageChange, totalItems, perPage }) => {
  const pageCount = Math.ceil(totalItems / perPage)
  if (pageCount <= 1) return null 

  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={(evt) => onPageChange(evt.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="‹"
      nextLabel="›"
      breakLabel="..."
    />
  )
}

export default Pagination
