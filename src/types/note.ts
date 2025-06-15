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
interface FetchNotesResponse {
  notes: Note[];
  total: number;
}

const { data } = useQuery<FetchNotesResponse>(['notes', params], fetchNotesFunction);

// Тогда data?.notes и data?.total будут корректно доступны
interface Props {
  onClose: () => void;
  children?: React.ReactNode;
}