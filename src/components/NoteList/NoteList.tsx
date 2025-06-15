// src/components/NoteList.tsx

import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchNotes, deleteNote } from '../services/noteService'
import { Note } from '../types/note'
import css from './NoteList.module.css'

const NoteList: React.FC<{ page: number; search: string }> = ({ page, search }) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery(
    ['notes', page, search],
    () => fetchNotes({ page, search }),
    {
      keepPreviousData: true, 
    }
  )

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    queryClient.invalidateQueries(['notes']) 
  }

  if (isLoading) return <p>Завантаження нотаток...</p>
  if (isError) return <p>Помилка при завантаженні.</p>
  if (!data || data.notes.length === 0) return null 

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {note.tags?.map(tag => (
              <span key={tag} className={css.tag}>{tag}</span>
            ))}
            <button className={css.button} onClick={() => handleDelete(note.id)}>
              Видалити
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
