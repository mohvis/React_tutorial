import { useState } from "react";
import Profile from "../assets/profileimage.png";

export default function ProfileDropdown({ tasks }) {
  const [isOpen, setIsOpen] = useState(false);

  // Collect all assignees from tasks in all columns
  const assignees = Array.from(
    new Set(
      Object.values(tasks)
        .flat()
        .map((task) => task.assignedTo)
        .filter(Boolean)
    )
  );

  return (
    <div className="relative">
      <img
        src={Profile}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <ul className="text-sm text-gray-700">
            {assignees.length > 0 ? (
              assignees.map((name, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100">
                  👤 {name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No assignees yet</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
