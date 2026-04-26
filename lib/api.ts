import { NotesResponse, Note } from "@/types/note";

// Ці дані будуть доступні завжди, поки запущено проект
const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Перша нотатка",
    content: "Текст вашої першої нотатки",
    category: "Work",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Покупки",
    content: "Купити молоко та хліб",
    category: "Personal",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fetchNotes = async (
  category: string = "",
): Promise<NotesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const isAll = !category || category.toLowerCase() === "all";
  const filtered = isAll
    ? MOCK_NOTES
    : MOCK_NOTES.filter(
        (n) => n.category.toLowerCase() === category.toLowerCase(),
      );

  return { items: filtered, total: filtered.length };
};

export const fetchNoteById = async (id: string): Promise<Note | undefined> => {
  return MOCK_NOTES.find((n) => n.id === id);
};

export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const newNote: Note = {
    id: Math.random().toString(36).substring(2, 9),
    title: noteData.title || "Untitled",
    content: noteData.content || "",
    category: noteData.category || "Work",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  MOCK_NOTES.push(newNote);
  return newNote;
};

export const deleteNote = async (id: string): Promise<void> => {
  const index = MOCK_NOTES.findIndex((n) => n.id === id);
  if (index !== -1) MOCK_NOTES.splice(index, 1);
};
