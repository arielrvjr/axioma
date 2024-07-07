import { create } from 'zustand';
import { TodoListScreen } from './screens/TodoListScreen';
import { AddTodoScreen } from './screens/AddTodoScreen';

// Definición del estado del módulo
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
};

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (title: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now().toString(), title, completed: false },
      ],
    })),
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  setTodos: (todos: Todo[]) => set({ todos }),
}));

const todoModule = {
  name: 'todoModule',
  routes: {
    TodoList: TodoListScreen,
    AddTodo: AddTodoScreen,
  },
  pluginsRequired: [],
  dependencies: [],
  entryScreen: 'TodoList',
  store: useTodoStore,
};

export default todoModule;
