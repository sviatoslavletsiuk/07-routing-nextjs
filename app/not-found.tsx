import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>Сторінку не знайдено</h2>
      <p className={styles.description}>
        Ми не змогли знайти те, що ви шукаєте. Можливо, категорія порожня,
        нотатку було видалено або ви помилилися в адресі.
      </p>
      <Link href="/notes/filter/all" className={styles.homeButton}>
        Повернутися до нотаток
      </Link>
    </main>
  );
}
