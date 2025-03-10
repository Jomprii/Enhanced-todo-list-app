import { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  {
    /* Enter button auto add task */
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  {
    /* Delete Task Function */
  }
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  {
    /* Mark as Complete Function */
  }
  const toggleCompletion = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  {
    /* Edit Task Function */
  }
  const editTask = (index, newText) => {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, text: newText } : t)));
  };

  {
    /*Filter Task Function */
  }
  const filteredTasks = tasks.filter((t) =>
    filter === "completed"
      ? t.completed
      : filter === "pending"
      ? !t.completed
      : true
  );

  return (
    <div>
      <h2>To-Do List</h2>
      {/* Add task function */}
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Task Filter buttons */}
      <div className="filterbuttons">
        <button className="filterbutton" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="filterbutton" onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button className="filterbutton" onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>
      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompletion(index)}
            />
            <span
              onClick={() => toggleCompletion(index)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.text}
            </span>
            {/* Edit Button */}
            <button
              className="editfunc"
              onClick={() =>
                editTask(index, prompt("Edit task:", t.text) || t.text)
              }
            >
              <MdEdit size={17} />
            </button>
            {/* Delete Button */}
            <button className="deletefunc" onClick={() => removeTask(index)}>
              <MdDeleteForever size={17} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
