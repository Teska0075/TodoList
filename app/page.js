import TodoList from "./components/TodoList";
import css from "./page.module.css"

export default function Home() {
  return (
    <div className={css.container}>
      <TodoList/>
    </div>
  );
}
