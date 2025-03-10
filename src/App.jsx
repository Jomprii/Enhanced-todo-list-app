import { useState, useEffect } from "react";
import TodoList from "./todolist";
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* Dark mode button toggle */}
      <button onClick={toggleDarkMode} className="mode-toggle">
        {darkMode ? <FaSun size="20" /> : <FaMoon size="20" />}
      </button>
      <h1>React TODO App</h1>
      <TodoList />
    </div>
  );
}

export default App;
