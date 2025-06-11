import { useState } from "react";

export default function Sidebar({ tasks, taskHistory }) {
  const [activeStage, setActiveStage] = useState(null);

  const stages = ["backlog", "todo", "inprogress", "inreview", "done"];

  const getStageColor = (stage) => {
    switch (stage) {
      case "todo": return "text-blue-500";
      case "inprogress": return "text-yellow-500";
      case "inreview": return "text-purple-500";
      case "done": return "text-green-500";
      case "backlog":
      default: return "text-gray-500";
    }
  };

  return (
    <aside className="w-64 h-[calc(100vh-100px)] bg-white rounded-xl shadow-lg p-4 m-4 sticky top-[100px] overflow-y-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Workflow</h2>

      {/* Stages Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Stages:</h3>
        <ul className="list-inside list-disc text-sm text-gray-600 space-y-1">
          {stages.map((stage) => (
            <li
              key={stage}
              className={`hover:text-blue-600 cursor-pointer capitalize ${
                activeStage === stage ? "font-bold underline" : ""
              }`}
              onClick={() => setActiveStage(stage)}
            >
              {stage}
            </li>
          ))}
        </ul>
      </div>

      {/* Tasks based on stage */}
{activeStage && (
  <div className="mb-6">
    <h3 className="text-md font-semibold text-gray-700 mb-2">
      Tasks in <span className="capitalize">{activeStage}</span>:
    </h3>
    <ul className="space-y-2 text-sm text-gray-700">
      {(tasks[activeStage] || []).map((task) => {
        const isCompleted = activeStage === "done"; // ✅ only mark completed if in 'done'

        return (
          <li
            key={task.id}
            className={`bg-gray-100 p-2 rounded hover:bg-gray-200 transition ${
              isCompleted ? "border-l-4 border-green-400" : ""
            }`}
          >
            <div className="font-medium">{task.content}</div>
            <div className="text-xs text-gray-500">
              Assigned to: {task.assignedTo || "Unassigned"}
            </div>

            <div className={`text-xs mt-1 font-semibold ${isCompleted ? "text-green-600" : "text-blue-600"}`}>
              Status: {isCompleted ? "Completed" : "Active"}
            </div>

            {task.updatedAt && (
              <div className="text-xs text-gray-400 italic">
                Updated at: {new Date(task.updatedAt).toLocaleString()}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
)}




      {/* Assignees Section (Preserved) */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Assignees:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {Object.keys(tasks).flatMap((column) =>
            tasks[column].map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                <span>{task.assignedTo || "Unassigned"}</span>
                <span className={`text-xs ${getStageColor(column)}`}>
                  ({column})
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
