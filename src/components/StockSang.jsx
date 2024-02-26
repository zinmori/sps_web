import { useEffect, useState } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function StockSang() {
  const [stock, setStock] = useState([]);
  const stockCollectionRef = collection(db, "stock");

  useEffect(() => {
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
        backgroundColor: "rgba(0, 0, 255, 1)",
      },
      {
        label: "Negatif",
        data: negatif.map((item) => item.quantite),
        backgroundColor: "rgba(253, 255, 3, 1)",
      },
    ],
  };
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
          color: "rgba(255, 255, 255, 1)",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          font: {
            weight: "bold",
          },
          color: "rgba(255, 255, 255, 1)",
        },
      },
      y: {
        grid: {
          color: function (context) {
            if (context.tick.value === 100) {
              return "rgba(80, 0, 0, 1)";
            } else {
              return "rgba(255, 255, 255, 0.2)";
            }
          },
        },
        ticks: {
          font: {
            weight: "bold",
          },
          color: function (context) {
            if (context.tick.value === 100) {
              return "rgba(80, 0, 0, 1)";
            } else {
              return "rgba(255, 255, 255, 1)";
            }
          },
        },
      },
    },
  };

  return (
    <div className="h-screen w-full">
      <div className="w-full h-2/5 mb-1 bg-green-600 rounded-xl"></div>
      <div className="w-full h-3/5">
        <Bar
          className="bg-gradient-to-t from-red-700 to-yellow-700 rounded-xl p-4"
          color="#fff"
          data={data}
          options={options}
        ></Bar>
      </div>
    </div>
  );
}
