import {ITodo} from './TodoListContainer';
interface ITodoListItemProps {
  listItem:ITodo;
  updateTodoItem: (id:number)=>void;
}
const TodoListItem = ({ listItem, updateTodoItem } : ITodoListItemProps)=>{
  return (
    <section key={`todoListItem_${listItem.id}`}>
      <div>{listItem.text}</div>
      <div onClick={()=>{updateTodoItem(listItem.id);}}>{listItem.completed?'C':'P'}</div>
    </section>
  )
}

export default TodoListItem;
