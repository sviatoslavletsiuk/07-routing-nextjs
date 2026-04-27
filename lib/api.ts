import axios from "axios";
import { Note, CreateNoteDto, NotesResponse } from "@/types/note";

const api = axios.create({
  // Твій URL MockAPI
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
  tag: string = "all",
): Promise<NotesResponse> => {
  // MockAPI використовує 'page' та 'limit'.
  // Якщо першої нотатки немає, можливо, MockAPI очікує старт з 1 (ми це вказали).
  const params: Record<string, string | number | undefined> = {
    page: page,
    limit: perPage,
    search: search || undefined,
  };

  // Фільтрація по тегу
  if (tag && tag !== "all") {
    params.tag = tag;
  }

  try {
    const { data, headers } = await api.get<Note[]>("/notes", { params });

    // MockAPI часто не повертає x-total-count.
    // Якщо заголовок порожній, ставимо дефолтне значення або довжину масиву.
    const totalCount = parseInt(headers["x-total-count"] || "50", 10);
    const totalPages = Math.ceil(totalCount / perPage) || 1;

    return {
      notes: data,
      totalPages: totalPages,
      total: totalCount,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};
