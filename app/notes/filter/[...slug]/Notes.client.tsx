"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  category: string;
}

export default function NotesClient({ category }: NotesClientProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes("", 1, 10, category),
  });

  if (isLoading)
    return (
      <div className="p-10 text-center">
        Завантаження категорії {category}...
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Помилка:{" "}
        {error instanceof Error ? error.message : "Не вдалося завантажити дані"}
      </div>
    );

  const notes = data?.items || [];

  return (
    <div>
      {notes.length > 0 ? (
        <NoteList notes={notes as Note[]} />
      ) : (
        <div className="p-10 border-2 border-dashed text-center text-gray-400 rounded-lg">
          Для категорії {category} нотаток не знайдено.
        </div>
      )}
    </div>
  );
}
