import { redirect } from "next/navigation";

export default function Home() {
  // Коли користувач заходить на http://localhost:3000/
  // ми автоматично відправляємо його на сторінку зі списком усіх нотаток
  redirect("/notes/filter/all");
}
