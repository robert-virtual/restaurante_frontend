import TodoListItem from "./TodoListItem";

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}
interface IPropsTodoListContainer {
  todos: ITodo[];
  updateTodoItem: (id:number)=>void;
}
const TodoListContainer = ({
  todos = [],
  updateTodoItem
}:IPropsTodoListContainer) => {
  return (
    <section className="TodoListContainer">
      {todos.map(o=><TodoListItem listItem={o} updateTodoItem={updateTodoItem}/>)}
    </section>
  );
}
export default TodoListContainer;
