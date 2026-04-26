"use client";
import Modal from "@/components/Modal/Modal";
import { NotePreview } from "@/components/NotePreview/NotePreview";
import { useParams, useRouter } from "next/navigation";

export default function InterceptedNotePage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id as string} />
    </Modal>
  );
}
