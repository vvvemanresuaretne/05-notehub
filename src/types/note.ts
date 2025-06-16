export interface Note {
  id: string
  title: string
  content: string
  tags?: string[]
}

export interface FetchNotesResponse {
  notes: Note[]
  total: number
}