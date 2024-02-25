import StockSang from "../components/StockSang.jsx";

export default function Dashboard() {
  return (
    <div className="bg-slate-200 w-4/5 flex flex-row p-1 gap-1">
      <div className="w-3/5 h-full flex flex-col items-center justify-center">
        <StockSang />
      </div>
      <div className="w-2/5 h-full flex flex-col gap-1">
        <div className="h-1/4 bg-blue-500 rounded-xl">Info diverses</div>
        <div className="h-1/4 bg-green-500 rounded-xl">Aujourd'hui</div>
        <div className="h-1/2 bg-purple-500 rounded-xl">Historique</div>
      </div>
    </div>
  );
}
