import { redirect } from "next/navigation";

export default function Home() {
  // Це виправить помилку "Cannot find module" та перенаправить на нотатки
  redirect("/notes/filter/all");
}
