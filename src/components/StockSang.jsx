import { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { LimitContext } from "../utils/Context.jsx";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function StockSang() {
  const [stock, setStock] = useState([]);
  const { limite, updateLimite } = useContext(LimitContext);

  useEffect(() => {
    const stockCollectionRef = collection(
      db,
      "stock",
      "afagnan@gmail.com",
      "banque"
    );
    const getStock = async () => {
      const data = await getDocs(stockCollectionRef);
      setStock(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getStock();
  }, []);

  const sortedStock = stock.slice().sort((a, b) => {
    const groupeA = a.groupe.replace(/[+-]/g, "");
    const groupeB = b.groupe.replace(/[+-]/g, "");
    return groupeA.localeCompare(groupeB);
  });

  const positif = sortedStock.filter((item) => item.groupe.endsWith("+"));
  const negatif = sortedStock.filter((item) => item.groupe.endsWith("-"));

  const data = {
    labels: ["A", "AB", "B", "O"],
    datasets: [
      {
        label: "Positif",
        data: positif.map((item) => item.quantite),
        backgroundColor: "rgba(220, 38, 38, 0.5)",
        borderColor: "rgba(220, 38, 38, 1)",
        borderWidth: 4,
      },
      {
        label: "Negatif",
        data: negatif.map((item) => item.quantite),
        backgroundColor: "rgba(109, 40, 217, 0.5)",
        borderColor: "rgba(109, 40, 217, 1)",
        borderWidth: 4,
      },
    ],
  };

  function getColor(value, opacity) {
    if (value === parseInt(limite)) {
      return "rgba(185, 28, 28, 1)";
    } else {
      return "rgba(0, 0, 0, " + opacity + ")";
    }
  }

  const options = {
    plugins: {
      title: {
        text: "Répartition des quantités de sang disponibles par groupe sanguin",
      },
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
          color: "rgba(0, 0, 0, 1)",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            weight: "bold",
          },
          color: "rgba(0, 0, 0, 1)",
        },
      },
      y: {
        grid: {
          color: (context) => getColor(context.tick.value, "0.1"),
        },
        ticks: {
          stepSize: 50,
          min: 0,
          max: Math.max(...stock.map((item) => item.quantite)),
          font: {
            weight: "bold",
          },
          color: (context) => getColor(context.tick.value, "1"),
        },
      },
    },
  };

  return (
    <div className="h-screen w-full">
      <div className="w-full h-1/3 mb-1 p-6 bg-gradient-to-b from-slate-400 to-slate-200 rounded-xl flex flex-row items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Groupes sanguins en manque</h2>
          <ul className="font-light">
            {stock
              .filter((item) => item.quantite < limite)
              .map((item) => (
                <li key={item.groupe}>
                  {item.groupe} : {item.quantite} poches disponibles
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-row gap-2">
          <h2 className="font-semibold">Changer la limite</h2>
          <select
            className="w-24 rounded-md focus:ring-red-600 focus:ring-2 focus:outline-none"
            onChange={(event) => updateLimite(event.target.value)}
          >
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
          </select>
        </div>
      </div>
      <div className="w-full h-2/3 bg-gradient-to-t from-slate-400 to-slate-200 rounded-xl p-4">
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
}
