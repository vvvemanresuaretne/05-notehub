import React, { useState, useEffect } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import SearchBox from './components/searchBox/SearchBox'
import NoteModal from './components/NoteModal/NoteModal'
import NoteList from './components/NoteList/NoteList'
import Pagination from './components/Pagination/Pagination'

import { fetchNotes, createNote, deleteNote } from './services/noteService'
import type { FetchNotesResponse } from './types/note'

import css from './components/App/App.module.css' // <== виправлено

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [isModalOpen, setModalOpen] = useState(false)

  const perPage = 12
  const queryClientInstance = useQueryClient()

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    keepPreviousData: true,
  })

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['notes'] })
      setModalOpen(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return (
    <div className={css.container}>
      <h1 className={css.title}>NoteHub</h1>

      <SearchBox value={search} onChange={setSearch} />
      <button onClick={() => setModalOpen(true)} className={css.addButton}>
        Add Note
      </button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && (
        <>
          <NoteList notes={data.notes} onDelete={deleteMutation.mutate} />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data.total / perPage)}
            onPageChange={setPage}
          />
        </>
      )}

      {isModalOpen && (
        <NoteModal onClose={() => setModalOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const input = form.elements.namedItem('note') as HTMLInputElement
              if (input.value) {
                createMutation.mutate({ content: input.value })
                form.reset()
              }
            }}
          >
            <input type="text" name="note" required />
            <button type="submit">Save</button>
          </form>
        </NoteModal>
      )}
    </div>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
)

export default App