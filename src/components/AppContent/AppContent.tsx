import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../../services/noteService'
import Modal from '../NoteModal/NoteModal'
import NoteForm from '../NoteForm/NoteForm'

const AppContent: React.FC = () => {
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)

  const createMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']) // обновляем заметки
    },
  })

  const handleCreate = (title: string, content: string, tag: string) => {
    createMutation.mutate({ title, content, tag })
    setModalOpen(false)
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Створити нотатку</button>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onSubmit={handleCreate} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default AppContent