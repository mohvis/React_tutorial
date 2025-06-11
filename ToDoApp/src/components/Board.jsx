import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import { useState } from "react";

export default function Board({ tasks, setTasks }) {
  const columns = ["backlog", "todo", "inprogress", "done"];
  const [activeInputColumn, setActiveInputColumn] = useState(null); // 👈

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.data.current.column === over.id) return;

    const fromCol = active.data.current.column;
    const toCol = over.id;
    const movingTask = tasks[fromCol].find((t) => t.id === active.id);

    const updatedTask = {
      ...movingTask,
      updatedAt: new Date().toISOString(),
    };

    setTasks((prev) => {
      const updatedFrom = prev[fromCol].filter((t) => t.id !== active.id);
      const updatedTo = [...prev[toCol], updatedTask];
      return {
        ...prev,
        [fromCol]: updatedFrom,
        [toCol]: updatedTo,
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => (
          <Column
            key={col}
            column={col}
            tasks={tasks[col]}
            setTasks={setTasks}
            showInputs={activeInputColumn === col} // 👈
            setActiveInputColumn={setActiveInputColumn} // 👈
          />
        ))}
      </div>
    </DndContext>
  );
}
