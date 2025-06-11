import TodoLogo from "../assets/TodoLogo.png";
import Profile from "../assets/profileimage.png";
import ProfileDropdown from "./ProfileDropdown";

export default function Header({ tasks }) {
  return (
    <header className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 py-4 px-6 mb-6 rounded-lg shadow-md">
      
      <div className="flex items-center justify-center relative mb-4">
        
        <img src={TodoLogo} alt="Logo" className="w-20 h-20 mx-auto" />

         <ProfileDropdown tasks={tasks}/>
      </div>

      <h2 className="text-4xl font-bold text-black text-center">
        Project Management
      </h2>
    </header>
  );
}
