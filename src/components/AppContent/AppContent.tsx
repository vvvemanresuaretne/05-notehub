import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../../services/noteService' // твоя функция создания заметки

const AppContent: React.FC = () => {
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)

  // Настраиваем мутацию создания заметки
  const createMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']) // обновляем список заметок после создания
    },
  })

  const handleCreate = (title: string, content: string, tag: string) => {
    createMutation.mutate({ title, content, tag })
    setModalOpen(false)
  }

  // Пример вызова handleCreate
  // Можно передавать handleCreate в форму создания заметки и вызывать оттуда

  return (
    <div>
      {/* ... UI ... */}
      <button onClick={() => setModalOpen(true)}>Створити нотатку</button>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          {/* В форме вызови handleCreate */}
          <CreateNoteForm onCreate={handleCreate} />
        </Modal>
      )}
    </div>
  )
}

export default AppContent