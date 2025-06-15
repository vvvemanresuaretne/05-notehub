import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchNotes, deleteNote } from '../../services/noteService'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'

interface Props {
  page: number
  search: string
}

interface FetchNotesResponse {
  notes: Note[]
  total: number
}

const NoteList: React.FC<Props> = ({ page, search }) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    keepPreviousData: true,
  })

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Ви впевнені, що хочете видалити цю нотатку?')
    if (!confirmed) return

    try {
      await deleteNote(id)
      queryClient.invalidateQueries(['notes'])
    } catch (error) {
      console.error('Помилка при видаленні нотатки:', error)
      alert('Не вдалося видалити нотатку. Спробуйте ще раз.')
    }
  }

  if (isLoading) return <p className={css.loading}>Завантаження нотаток...</p>
  if (isError) return <p className={css.error}>Помилка при завантаженні нотаток.</p>
  if (!data || data.notes.length === 0)
    return <p className={css.empty}>Нотаток не знайдено.</p>

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            {Array.isArray(note.tags) && note.tags.length > 0 && (
              note.tags.map((tag) => (
                <span key={tag} className={css.tag}>{tag}</span>
              ))
            )}
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Видалити
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList