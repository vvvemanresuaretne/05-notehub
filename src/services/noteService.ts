import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const api = axios.create({
  baseURL: import.meta.env.VITE_NOTEHUB_BASE_URL || 'https://api.example.com',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  pageSize: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const res: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params: { page, perPage, search },
  });
  return res.data;
}

export async function createNote(data: {
  title: string
  content: string
  tag: string
}): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post('/notes', data)
  return res.data
}


export async function deleteNote(id: string): Promise<{ success: boolean; id: string }> {
  const res: AxiosResponse<{ success: boolean; id: string }> = await api.delete(`/notes/${id}`);
  return res.data;
}
