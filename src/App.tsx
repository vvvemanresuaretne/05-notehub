// src/App.tsx

import React, { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import css from './App.module.css'
import SearchBox from './components/SearchBox'
import Pagination from './components/Pagination'
import NoteModal from './components/NoteModal'
import NoteList from './components/NoteList'
import { fetchNotes, deleteNote, createNote } from './services/noteService'
import { Note } from './types/note'

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const qc = useQueryClient()
  const perPage = 12

  const {
    data,
    isLoading,
    isError,
  } = useQuery(
    ['notes', page, search],
    () => fetchNotes({ page, perPage, search }),
    {
      keepPreviousData: true,
      placeholderData: (prev) => prev, // щоб уникнути мерехтіння :contentReference[oaicite:0]{index=0}
    }
  )

  const createMutation = useMutation(createNote, {
    onSuccess: () => qc.invalidateQueries(['notes']),
  })

  const deleteMutation = useMutation(deleteNote, {
    onSuccess: () => qc.invalidateQueries(['notes']),
  })

  const handleCreate = (title: string, content: string) => {
    createMutation.mutate({ title, content })
    setModalOpen(false)
  }

  const handleDelete = (id: string)
