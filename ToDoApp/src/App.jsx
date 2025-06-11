import Header from "./components/Header";
import Board from "./components/Board";
import { useState, useEffect } from "react";
import DownloadButton from "./components/DownloadButton";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
const LOCAL_STORAGE_KEY = "kanbanBoardData";

export default function App() {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inprogress: [],
    done: [],
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-white p-4 ">
      <Header tasks={tasks} />
      <div className="flex items-start">
      <Sidebar tasks={tasks}/>
      <main className="flex-1 p-6 overflow-x-auto ">
      <DownloadButton data={tasks} className="mb-4" />
      <Board tasks={tasks} setTasks={setTasks} />
      </main>
      </div>
      <Footer/>
    </div>

  );
}
