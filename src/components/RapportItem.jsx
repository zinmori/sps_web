import { FiDownload } from "react-icons/fi";

export default function RapportItem({ img, title }) {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-red-50">
      <img class="w-full h-40" src={img} alt={title} />
      <div class="px-6 py-4">
        <div class="flex justify-between items-center mb-2">
          <div class="font-semibold text-xl">{title}</div>
          <button class="hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded">
            <FiDownload size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
