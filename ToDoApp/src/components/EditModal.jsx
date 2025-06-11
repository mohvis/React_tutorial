import { useEffect, useRef } from "react";

export default function EditModal({ show, onClose, task, onSave }) {
  const inputRef = useRef();

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  if (!show) return null;

  const handleSave = () => {
    onSave({ ...task, content: inputRef.current.value });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-xl mb-2 font-semibold">Edit Task</h2>
        <input
          ref={inputRef}
          defaultValue={task.content}
          className="w-full p-2 border rounded"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
