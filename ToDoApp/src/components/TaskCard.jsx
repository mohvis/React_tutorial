import { useDraggable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { FiMove } from "react-icons/fi"; // optional: drag handle icon

export default function TaskCard({ task, column, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { column },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.content);

  useEffect(() => {
    setEditText(task.content);
  }, [task.content]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-100 p-3 rounded shadow text-sm relative"
    >
      {/* Drag handle */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-1 right-1 cursor-move text-gray-500"
        title="Drag"
      >
        <FiMove />
      </div>

      {isEditing ? (
        <>
          <input
            className="w-full mb-2 p-1 border rounded"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="text-blue-600 hover:underline mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="font-medium">{task.content}</p>
          <p className="text-xs text-gray-500">Assigned to: {task.assignedTo}</p>
          <div className="mt-2 flex gap-2 text-xs">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
