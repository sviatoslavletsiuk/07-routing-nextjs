"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "@/app/notes/[id]/NoteDetails.module.css";

export default function NoteDetailsModal() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <p>Завантаження...</p>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={handleClose}>
        <p>Нотатку не знайдено.</p>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <article className={css.container}>
        <header>
          <span className={css.tag}>{note.tag}</span>
          <h1>{note.title}</h1>
        </header>
        <div className={css.content}>
          <p>{note.content}</p>
        </div>
        <footer className={css.meta}>
          <small>Оновлено: {new Date(note.updatedAt).toLocaleString()}</small>
        </footer>
      </article>
    </Modal>
  );
}
