// src/App.tsx
import React, { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'
import SearchBox from './components/SearchBox'
import NoteModal from './components/NoteModal'
import NoteList from './components/NoteList'
import Pagination from './components/Pagination'
import { fetchNotes, createNote, deleteNote } from './services/noteService'
import css from './App.module.css'

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500) // debounce на 500мс
  const [isModalOpen, setModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const perPage = 12

  const { data, isLoading, isError } = useQuery(
    ['notes', page, debouncedSearch],
    () => fetchNotes({ page, perPage, search: debouncedSearch }),
    {
      keepPreviousData: true,
    }
  )

  const createMutation = useMutation(createNote, {
    onSuccess: () => queryClient.invalidateQueries(['notes']),
  })

  const deleteMutation = useMutation(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries(['notes']),
  })

  const handleCreate = (title: string, content: string, tag: string) => {
    createMutation.mutate({ title, content, tags: [tag] }) // tags: масив
    setModalOpen(false)
  }

  return (
    <>
      <header className={css.header}>
        <SearchBox search={search} onSearch={setSearch} />
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main className={css.main}>
        <NoteList
          page={page}
          search={debouncedSearch}
        />
        <Pagination
          page={page}
          setPage={setPage}
          total={data?.total || 0}
          perPage={perPage}
        />
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </>
  )
}

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
)

export default App
