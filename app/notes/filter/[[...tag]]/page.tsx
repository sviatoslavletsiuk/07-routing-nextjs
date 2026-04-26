"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";

export default function FilteredNotesPage() {
  const params = useParams();
  const tagParam = params?.tag;
  const category = (Array.isArray(tagParam) ? tagParam[0] : tagParam) || "all";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes("", 1, 10, category),
  });

  if (isLoading) return <div className="p-10 text-center">Завантаження...</div>;

  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Бекенд не відповідає. Перевірте, чи запущено сервер на порту 3001.
        <br />
        {error instanceof Error ? error.message : ""}
      </div>
    );

  const notes = data?.items || [];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Категорія: {category}</h1>
      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <div className="p-10 border-2 border-dashed text-center text-gray-400 rounded-lg">
          Тут поки порожньо для категорії {category}.
        </div>
      )}
    </div>
  );
}
