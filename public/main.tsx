/// <reference lib="dom" />
/** @jsx h */
import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    const fetchTasks = async () => {
        const response = await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                tasks {
                  id
                  title
                  completed
                }
              }
            `,
          }),
        });
        const { data } = await response.json();
        setTasks(data.tasks as Task[]);
      };
    
      useEffect(() => {
        fetchTasks();
      }, []);
    
      const addTask = async () => {
        await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              mutation ($title: String!) {
                addTask(title: $title) {
                  id
                  title
                  completed
                }
              }
            `,
            variables: { title: newTask },
          }),
        });
        setNewTask("");
        fetchTasks();
      };
    
      const toggleTask = async (id: string, completed: boolean) => {
        await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              mutation ($id: ID!, $completed: Boolean!) {
                toggleTask(id: $id, completed: $completed) {
                  id
                  completed
                }
              }
            `,
            variables: { id, completed },
          }),
        });
        fetchTasks();
      };

    return(
        <div>
            <h1>Task List</h1>
            <input
                value={newTask}
                onInput={(e) => setNewTask((e.target as HTMLInputElement).value)}
                placeholder="New Task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id, !task.completed)}
                        />
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

render(<App/>, document.getElementById("app")!);