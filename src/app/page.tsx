"use client";

import TodoCount from "@/components/TodoCount";
import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";

export type TodoType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  date: Date;
};

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: uuid(),
      todo: "Test One",
      isCompleted: true,
      date: new Date("2024/01/01"),
    },
    {
      id: uuid(),
      todo: "Test Two",
      isCompleted: false,
      date: new Date("2024/01/01"),
    },
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    if (selectedTodoId) {
      const todoIdx = todos.findIndex((todo) => todo.id === selectedTodoId);
      todos[todoIdx].todo = input;

      setTodos((todos) => [...todos]);
      setSelectedTodoId(null);
      setInput("");
      return;
    }

    setTodos((todos) => [
      ...todos,
      {
        id: uuid(),
        todo: input,
        isCompleted: false,
        date: new Date(),
      },
    ]);
    setInput("");
  };

  const deleteTodo = (id: string) => {
    setTodos((todos) => [...todos.filter((todo) => todo.id !== id)]);
  };

  const switchCompleted = (id: string) => {
    const todoIdx = todos.findIndex((todo) => todo.id === id);
    todos[todoIdx].isCompleted = !todos[todoIdx].isCompleted;
    setTodos((todos) => [...todos]);
  };

  return (
    <main className="space-y-4 flex justify-center items-center flex-col w-full p-4 my-8">
      {/* Header */}
      {/* <nav className="bg-[#800000] flex justify-center items-center flex-grow py-4 text-white text-2xl drop-shadow-xl w-full">
        <h4>TodoList</h4>
      </nav> */}

      <section className="space-y-4 p-6 border-2 rounded-3xl bg-white drop-shadow-lg">
        <div className="flex justify-center items-center text-center">
          <p className="text-3xl pt-6">TodoList</p>
        </div>
        {/* Input */}
        <section className="flex justify-center items-center">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="max-w-2xl p-6 drop-shadow-lg w-[300px] md:w-[600px] rounded-2xl flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Please enter your todo..."
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </section>

        {/* Tracking Todos */}
        <section className="flex justify-center items-center">
          <div className="flex gap-2 text-center flex-col md:flex-row">
            <TodoCount
              title={"Completed Todos"}
              count={todos.reduce(
                (curr, val) => (val.isCompleted ? curr + 1 : curr),
                0
              )}
            />

            <TodoCount
              title={"Incompleted Todos"}
              count={todos.reduce(
                (curr, val) => (!val.isCompleted ? curr + 1 : curr),
                0
              )}
            />

            <TodoCount title={"Total Todos"} count={todos.length} />
          </div>
        </section>

        {/* Pending Todos */}
        <TodoList
          title="Incompleted Tasks"
          todos={todos.filter((todo) => !todo.isCompleted)}
          deleteTodo={deleteTodo}
          setInput={setInput}
          setSelectedTodoId={setSelectedTodoId}
          switchCompleted={switchCompleted}
          fallBackMsg="Great! You have no tasks left todo."
        />

        {/* Completed Todos */}
        <TodoList
          title="Completed Tasks"
          todos={todos.filter((todo) => !!todo.isCompleted)}
          deleteTodo={deleteTodo}
          setInput={setInput}
          setSelectedTodoId={setSelectedTodoId}
          switchCompleted={switchCompleted}
          fallBackMsg="Completed tasks will show here"
        />
      </section>
    </main>
  );
}
