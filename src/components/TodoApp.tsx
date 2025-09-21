import React, { useState } from 'react';
import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Todo List
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {totalCount > 0 ? `${completedCount}/${totalCount} 件完了` : 'タスクがありません'}
          </p>
          
          <AddTodo onAdd={addTodo} />
          
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                タスクを追加してください
              </p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;