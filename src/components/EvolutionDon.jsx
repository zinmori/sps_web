import { defaults } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 18;
defaults.plugins.title.color = "black";

export default function EvolutionDon() {
  const [entrees, setEntrees] = useState([]);
  const [sorties, setSorties] = useState([]);

  useEffect(() => {
    const entreeCollectionRef = collection(db, "dons");
    const sortieCollectionRef = collection(db, "sorties");
    const getData = async () => {
      const entreeData = await getDocs(entreeCollectionRef);
      const soriteData = await getDocs(sortieCollectionRef);

      const entree = entreeData.docs.map((doc) => ({ ...doc.data() }));
      const sortie = soriteData.docs.map((doc) => ({ ...doc.data() }));
      setEntrees(entree);
      setSorties(sortie);
    };

    getData();
  }, []);
  const entreeParMois = entrees
    .filter((don) => {
      const seconds = don.date.seconds;
      return (
        new Date(seconds * 1000).getFullYear() === new Date().getFullYear()
      );
    })
    .reduce((acc, don) => {
      const seconds = don.date;
      const mois = new Date(seconds * 1000).getMonth();
      const quantite = don.quantite;
      if (acc[mois]) {
        acc[mois] += quantite;
      } else {
        acc[mois] = quantite;
      }
      return acc;
    }, new Array(12).fill(0));

  const sortieParMois = sorties
    .filter((sortie) => {
      const seconds = sortie.date.seconds;
      return (
        new Date(seconds * 1000).getFullYear() === new Date().getFullYear()
      );
    })
    .reduce((acc, sortie) => {
      const mois = new Date(sortie.date * 1000).getMonth();
      const quantite = sortie.quantite;
      if (acc[mois]) {
        acc[mois] += quantite;
      } else {
        acc[mois] = quantite;
      }
      return acc;
    }, new Array(12).fill(0));

  const data = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Avr",
      "Mai",
      "Jun",
      "Jul",
      "Aou",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Entrées",
        data: entreeParMois,
        fill: false,
        backgroundColor: "rgba(0,0,255,1)",
        borderColor: "rgba(0,0,255,1)",
      },
      {
        label: "Sorties",
        data: sortieParMois,
        fill: false,
        backgroundColor: "rgba(255,0,0,1)",
        borderColor: "rgba(255,0,0,1)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        text: "Evolutions des entrées et sorties de sang au cours de l'année",
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
        beginAtZero: true,
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
    },
  };

  return <Line data={data} options={options}></Line>;
}
