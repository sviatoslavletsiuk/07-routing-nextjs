import axios from "axios";
import { Note, CreateNoteDto, NotesResponse } from "@/types/note";

const api = axios.create({
  baseURL: "https://69e60c73ce4e908a155edec4.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
});

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  perPage: number = 6,
  category: string = "all",
): Promise<NotesResponse> => {
  // Використовуємо тип Record замість any для ESLint
  const params: Record<string, string | number | undefined> = {
    page,
    limit: perPage,
    search: search || undefined,
  };

  if (category && category !== "all") params.category = category;

  const { data, headers } = await api.get<Note[]>("/notes", { params });

  // Розрахунок сторінок
  const totalCount = parseInt(headers["x-total-count"] || "50", 10);
  const totalPages = Math.ceil(totalCount / perPage) || 1;

  return {
    notes: data, // Для Notes.client.tsx
    items: data, // Для FilteredNotesPage та інших
    totalPages: totalPages,
    total: totalCount,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

// Цей експорт виправить помилку в NoteList.tsx (скріншот 2CA6)
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};
