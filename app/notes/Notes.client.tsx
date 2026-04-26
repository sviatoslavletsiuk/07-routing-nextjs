"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default function NotesClient({
  debouncedSearch,
  page,
}: {
  debouncedSearch: string;
  page: number;
}) {
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["notes", debouncedSearch, page, "all"],
    queryFn: () => fetchNotes(debouncedSearch, page, limit, "all"),
  });

  if (isLoading) return <div>Завантаження...</div>;

  // Використовуємо items та totalPages згідно з новим інтерфейсом
  const notesList = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <div className="grid gap-4">
        {notesList.map((note) => (
          <div key={note.id}>{note.title}</div>
        ))}
      </div>
      <div className="mt-4">
        Сторінка {page} з {totalPages}
      </div>
    </div>
  );
}
