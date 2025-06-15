// src/components/NoteForm.tsx
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import css from './NoteForm.module.css'

interface Props {
  onSubmit: (title: string, content: string, tag: string) => void
  onCancel: () => void
}

interface Values {
  title: string
  content: string
  tag: string
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Максимум 50 символів')
    .required('Обов’язкове поле'),
  content: Yup.string().max(500, 'Максимум 500 символів'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Обов’язкове поле'),
})

const initialValues: Values = { title: '', content: '', tag: 'Todo' }

const NoteForm: React.FC<Props> = ({ onSubmit, onCancel }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      onSubmit(values.title, values.content, values.tag)
      resetForm()
    }}
  >
    {({ isValid, isSubmitting }) => (
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            {['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={!isValid || isSubmitting}>
            Create note
          </button>
        </div>
      </Form>
    )}
  </Formik>
)

export default NoteForm
