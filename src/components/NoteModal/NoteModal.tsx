import React from 'react'
import ReactDOM from 'react-dom'
import css from './NoteModal.module.css'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal