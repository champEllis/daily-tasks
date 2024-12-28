import React from 'react';
import { Check, Trash2, Circle } from 'lucide-react';
import { Todo } from '../types/todo';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div className={`flex items-center justify-between p-4 ${
      todo.completed ? 'bg-gray-50' : 'bg-white'
    } border-b border-gray-200 group hover:bg-gray-50 transition-colors`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`p-1 rounded-full transition-colors ${
            todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {todo.completed ? <Check size={20} /> : <Circle size={20} />}
        </button>
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
          {todo.text}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </span>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}