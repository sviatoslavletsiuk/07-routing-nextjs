"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  debouncedSearch: string;
  page: number;
}

export default function NotesClient({
  debouncedSearch,
  page,
}: NotesClientProps) {
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearch, page, "all"],
    queryFn: () => fetchNotes(debouncedSearch, page, limit, "all"),
  });

  if (isLoading)
    return <div className="text-center p-5">Завантаження нотаток...</div>;
  if (isError)
    return (
      <div className="text-center p-5 text-red-500">Помилка завантаження.</div>
    );

  const notesList = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <NoteList notes={notesList as Note[]} />

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {/* Тут твоя логіка кнопок пагінації, що використовує totalPages */}
          <p className="text-sm text-gray-500">
            Сторінка {page} з {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
