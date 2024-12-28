import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoProvider } from './context/TodoContext';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { useTodo } from './context/TodoContext';

function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-500 text-white">
              <div className="flex items-center space-x-2">
                <CheckSquare size={24} />
                <h1 className="text-2xl font-bold">Daily Tasks</h1>
              </div>
              <p className="mt-2 text-blue-100">
                Unfinished tasks automatically roll over to the next day
              </p>
            </div>
            <div className="p-6 space-y-6">
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;