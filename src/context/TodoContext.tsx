import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, TodoContextType } from '../types/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Check for rollover at midnight
  useEffect(() => {
    const checkRollover = () => {
      const today = new Date().toISOString().split('T')[0];
      setTodos(prevTodos =>
        prevTodos.map(todo => {
          if (!todo.completed && todo.dueDate < today) {
            return { ...todo, dueDate: today };
          }
          return todo;
        })
      );
    };

    // Check immediately on load
    checkRollover();

    // Set up daily check at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      checkRollover();
      // Set up daily interval after first timeout
      setInterval(checkRollover, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const addTodo = (text: string) => {
    const today = new Date().toISOString().split('T')[0];
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: today
    }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}