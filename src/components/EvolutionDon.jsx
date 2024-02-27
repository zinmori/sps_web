import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function EvolutionDon() {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul"],
    datasets: [
      {
        label: "Entrées",
        data: [12, 19, 3, 5, 7, 4, 15],
        fill: false,
        backgroundColor: "rgba(0,0,255,1)",
        borderColor: "rgba(0,0,255,1)",
      },
      {
        label: "Sorties",
        data: [7, 9, 13, 11, 12, 8, 16],
        fill: false,
        backgroundColor: "rgba(255,0,0,1)",
        borderColor: "rgba(255,0,0,1)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        text: "Evolutions des entrées et sorties de sang",
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
