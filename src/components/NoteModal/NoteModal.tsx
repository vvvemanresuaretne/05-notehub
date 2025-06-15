// src/components/NoteModal.tsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import NoteForm from './NoteForm'
import css from './NoteModal.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string, content: string, tag: string) => void
}

const modalRoot = document.getElementById('modal-root')

const NoteModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !modalRoot) return null

  return ReactDOM.createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <NoteForm onSubmit={onCreate} onCancel={onClose} />
      </div>
    </div>,
    modalRoot
  )
}

export default NoteModal
