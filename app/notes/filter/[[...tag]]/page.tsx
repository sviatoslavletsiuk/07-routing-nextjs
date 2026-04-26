"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";

export default function FilteredNotesPage() {
  const params = useParams();
  const currentTag = Array.isArray(params?.tag) ? params.tag[0] : "all";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentTag],
    queryFn: () => fetchNotes(currentTag),
    // Це змусить React Query ігнорувати старі помилки з'єднання
    retry: false,
  });

  if (isLoading) return <div className="p-10">Завантаження нотаток...</div>;

  if (isError) {
    return (
      <div className="p-10 text-red-500">
        Помилка: {(error as Error).message}
      </div>
    );
  }

  // Перевірка: що саме прийшло?
  const notes = data?.items || [];

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Категорія: {currentTag}</h1>
      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <div className="border-2 border-dashed p-10 text-center text-gray-400">
          Тут поки порожньо. Спробуй змінити фільтр або додати нотатку.
        </div>
      )}
    </div>
  );
}
