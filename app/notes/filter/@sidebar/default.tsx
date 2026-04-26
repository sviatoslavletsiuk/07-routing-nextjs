import React from "react";
import Link from "next/link"; // Обов'язково додаємо цей імпорт

export default function SidebarDefault() {
  return (
    <nav style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h3>Фільтри</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/notes/filter/Work">Work</Link>
        </li>
        <li>
          <Link href="/notes/filter/Personal">Personal</Link>
        </li>
        <li>
          <Link href="/notes/filter/Todo">Todo</Link>
        </li>
        <li>
          <Link href="/notes/filter">Усі нотатки</Link>
        </li>
      </ul>
    </nav>
  );
}
