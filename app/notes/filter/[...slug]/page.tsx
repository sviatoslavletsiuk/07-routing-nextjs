"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";
import { Note } from "@/types/note";

export default function FilteredNotesPage() {
  const params = useParams();
  const slugParam = params?.slug;

  // Отримуємо категорію з URL
  const category =
    (Array.isArray(slugParam) ? slugParam[0] : slugParam) || "all";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", category],
    // Передаємо всі 4 аргументи
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
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        Категорія: {category}
      </h1>
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
