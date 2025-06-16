import React, { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import SearchBox from './components/SearchBox/SearchBox'
import Pagination from './components/Pagination/Pagination'
import NoteList from './components/NoteList/NoteList'

import { fetchNotes, createNote, deleteNote } from './services/noteService'
import type { FetchNotesResponse } from './types/note'

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [noteContent, setNoteContent] = useState('')
  const queryClient = useQueryClient()

  const perPage = 10

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    keepPreviousData: true,
  })

  const createMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
      setNoteContent('')
    },
  })

  const deleteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
  })

  const handleCreate = (content: string) => {
    createMutation.mutate({
      title: content.substring(0, 20) || 'Без назви',
      content,
      tag: 'Todo',
    })
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>NoteHub</h1>

      <SearchBox search={search} onSearch={setSearch} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (noteContent.trim()) {
            handleCreate(noteContent.trim())
          }
        }}
      >
        <input
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="New note content"
          required
        />
        <button type="submit" disabled={createMutation.isLoading}>
          Add Note
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && (
        <>
          <NoteList notes={data.notes} onDelete={(id) => deleteMutation.mutate(id)} />
          <Pagination
            page={page}
            onPageChange={setPage}
            totalItems={data.total}
            perPage={perPage}
          />
        </>
      )}
    </div>
  )
}

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
)

export default App