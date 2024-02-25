export default function Dashboard() {
  return (
    <div className="bg-slate-200 w-4/5 flex flex-row">
      <div className="w-3/5 h-full bg-yellow-100 text-center">
        Quantite par groupe
      </div>
      <div className="w-2/5 h-full flex flex-col">
        <div className="h-1/4 bg-blue-500">Info diverses</div>
        <div className="h-1/4 bg-green-500">Aujourd'hui</div>
        <div className="h-1/2 bg-purple-500">Historique</div>
      </div>
    </div>
  );
}
