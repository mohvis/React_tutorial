import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function Column({ column, tasks, setTasks, showInputs, setActiveInputColumn }) {
  const { setNodeRef } = useDroppable({ id: column });

  const [newTask, setNewTask] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleAdd = () => {
    if (!newTask.trim() || !assignedTo.trim()) return;

    const id = Date.now().toString();
    const newTaskObj = {
      id,
      content: newTask,
      assignedTo,
    };

    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], newTaskObj],
    }));

    setNewTask("");
    setAssignedTo("");
    setActiveInputColumn(null); // 👈 close the form after adding
  };

  const handleDelete = (id) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== id),
    }));
  };

  const handleEdit = (id, updatedContent) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === id ? { ...task, content: updatedContent } : task
      ),
    }));
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-stone-50 rounded-2xl shadow-md p-4 flex-1 min-w-[250px] flex flex-col mb-4"
    >
      <h2 className="font-bold capitalize text-lg mb-3 text-gray-800 border-b pb-1">
        {column}
      </h2>

      <div className="space-y-3 flex-grow">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            column={column}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {!showInputs ? (
        <button
          onClick={() => setActiveInputColumn(column)}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <FiPlus className="mr-1" />
          Add a card
        </button>
      ) : (
        <div className="mt-4 space-y-2">
          <input
            className="w-full p-2 text-sm border rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
          />
          <input
            className="w-full p-2 text-sm border rounded"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Enter assignee..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Add
            </button>
            <button
              onClick={() => setActiveInputColumn(null)}
              className="flex-1 px-3 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
