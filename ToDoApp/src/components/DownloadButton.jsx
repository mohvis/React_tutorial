// src/components/DownloadButton.jsx
import { downloadProjectData } from '../utils/exportData';
import downloadImg from "../assets/download.png";

export default function DownloadButton({ data }) {
  return (
    <div className=" shadow-sm mb-4 text-right ">
      <button
        className="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 px-2 py-0 rounded  stroke-current"
        onClick={() => downloadProjectData(data)}
      >
        <img src={downloadImg} alt="DownloadImg" className="w-5 h-5 object-contain" />
        <span>Download</span>
      </button>
    </div>
  );
}
