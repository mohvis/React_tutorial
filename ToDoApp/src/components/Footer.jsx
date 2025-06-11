import ProjectImg from "../assets/ProjectImg.avif"; 
import MohanTodo from "../assets/MohanTodoApp.png";

export default function Footer() {
  return (
    <div className="flex justify-center items-center gap-8 py-6 mt-8">
      <img
        className="h-[600px]  object-contain mr-4"
        src={ProjectImg}
        alt="Project"
      />
      <img
        className="float-right w-2xl h-[500px]"
        src={MohanTodo}
        alt="Mohan ToDo"
      />
    </div>
  );
}
