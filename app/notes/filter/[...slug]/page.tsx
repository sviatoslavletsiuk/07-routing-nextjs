"use client";

import NotesClient from "./Notes.client";
import { useParams } from "next/navigation";

export default function FilteredNotesPage() {
  const params = useParams();
  const slugParam = params?.slug;

  // Отримуємо категорію з URL
  const category =
    (Array.isArray(slugParam) ? slugParam[0] : slugParam) || "all";

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        Категорія: {category}
      </h1>
      <NotesClient category={category} />
    </div>
  );
}
