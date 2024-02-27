export default function InfoItem({ title, chiffre }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-100 rounded-xl w-1/2 h-full">
      <p className="text-2xl text-red-600 font-bold pb-2 border-b-2 border-black">
        {chiffre}
      </p>
      <p className="text-lg text-red-600 font-bold uppercase pt-2">{title}</p>
    </div>
  );
}
