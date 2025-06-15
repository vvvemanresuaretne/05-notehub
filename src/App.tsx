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
import css from './App.module.css'

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [isModalOpen, setModalOpen] = useState(false)
  const reactQueryClient = useQueryClient()
  const perPage = 12

  // Сброс страницы при новом поисковом запросе
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const { data, isLoading, isError } = useQuery(
    ['notes', page, debouncedSearch],
    () => fetchNotes({ page, perPage, search: debouncedSearch }),
    {
      keepPreviousData: true,
    }
  )

  const createMutation = use
