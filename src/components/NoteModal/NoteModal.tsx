// src/components/NoteModal.tsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import NoteForm from '../NoteForm/NoteForm'
import css from './NoteModal.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string, content: string, tag: string) => void
}

const modalRoot = document.getElementById('modal-root')

const NoteModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen || !modalRoot) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onSubmit={onCreate} onCancel={onClose} />
      </div>
    </div>,
    modalRoot
  )
}

export default NoteModal
