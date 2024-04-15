import { TodoType } from "@/app/page";
import { Dispatch, FC, SetStateAction } from "react";
import { Checkbox } from "./ui/checkbox";

interface Props {
  title: string;
  todos: TodoType[];
  switchCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
  setSelectedTodoId: Dispatch<SetStateAction<string | null>>;
  setInput: Dispatch<SetStateAction<string>>;
  fallBackMsg: string;
}

const TodoList: FC<Props> = ({
  title,
  todos,
  switchCompleted,
  setSelectedTodoId,
  setInput,
  deleteTodo,
  fallBackMsg,
}) => {
  return (
    <section className="border-2 p-8 rounded-2xl drop-shadow-sm bg-white">
      <h6 className="text-xl text-center p-4 pt-0">{title}</h6>
      {todos.length > 0 ? (
        todos
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((todo) => (
            <div
              className="flex gap-4 justify-between items-center"
              key={todo.id}
            >
              <div className="flex gap-2 md:flex-grow justify-start items-center w-[100px] md:w-[400px] flex-wrap">
                <Checkbox
                  id={`${todo.id}`}
                  checked={todo.isCompleted}
                  onClick={() => switchCompleted(todo.id)}
                />
                <p>{todo.todo}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedTodoId(todo.id);
                  setInput(todo.todo);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))
      ) : (
        <div>
          <p className="text-sm text-gray-400 text-center">{fallBackMsg}</p>
        </div>
      )}
    </section>
  );
};

export default TodoList;
