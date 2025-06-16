import React from 'react'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'

interface Props {
  notes: Note[]
  onDelete: (id: string) => void
}

const NoteList: React.FC<Props> = ({ notes, onDelete }) => {
  if (notes.length === 0) return <p className={css.empty}>Нотаток не знайдено.</p>

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.note}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => onDelete(note.id)}>Видалити</button>
        </li>
      ))}
    </ul>
  )
}

export default NoteList