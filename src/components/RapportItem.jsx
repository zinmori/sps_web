import { FiDownload } from "react-icons/fi";

export default function RapportItem({ img, title }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-50">
      <img className="w-full h-40" src={img} alt={title} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold text-xl">{title}</div>
          <button className="hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded">
            <FiDownload size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
