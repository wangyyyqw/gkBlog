export type TodoItemState = "spacing" | "typography" | "colors" | "effects";

export type Content = {
  state: TodoItemState;
  shows: Array<TodoItemState>;
  title: string;
  description: string;
};
