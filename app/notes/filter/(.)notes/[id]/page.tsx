"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";

export default function FilteredNotesPage() {
  const params = useParams();
  // Визначаємо категорію з URL (якщо порожньо — 'all')
  const category = Array.isArray(params?.tag) ? params.tag[0] : "all";

  const { data, isLoading } = useQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes("", 1, 10, category),
  });

  if (isLoading) return <div className="p-10">Завантаження...</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Категорія: {category}</h1>
      <NoteList notes={data?.items || []} />
    </div>
  );
}
