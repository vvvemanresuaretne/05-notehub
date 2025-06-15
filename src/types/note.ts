export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
}

export interface NoteTag {
  id: string;
  label: string;
}
