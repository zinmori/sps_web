import Giver from "../components/Giver.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config.js";

export default function Givers() {
  const [givers, setGivers] = useState([]);
  const [originalGivers, setOriginalGivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, givers.length);
  const paginatedGivers = givers.slice(startIndex, endIndex);

  function handleNextPage() {
    setCurrentPage((prevPage) =>
      endIndex === givers.length ? prevPage : prevPage + 1
    );
  }

  function handlePreviousPage() {
    setCurrentPage((prevPage) => (prevPage === 0 ? prevPage : prevPage - 1));
  }

  useEffect(() => {
    const getGivers = async () => {
      const usersCollectionsRef = collection(db, "users");
      const data = await getDocs(usersCollectionsRef);
      setGivers(data.docs.map((doc) => ({ ...doc.data() })));
      setOriginalGivers(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getGivers();
  }, []);

  function filterByName(name) {
    if (name === "") {
      console.log(name);
      setGivers(originalGivers);
    } else {
      const filteredGivers = [...givers].filter((giver) => {
        return (
          giver.nom && giver.nom.toLowerCase().includes(name.toLowerCase())
        );
      });
      setGivers(filteredGivers);
    }
  }

  function filterByGroupe(groupe) {
    if (groupe === "tout") {
      console.log(groupe);
      setGivers(originalGivers);
    } else {
      const filteredGivers = [...givers].filter((giver) => {
        return (
          giver.groupe_sanguin &&
          giver.groupe_sanguin.toLowerCase().includes(groupe.toLowerCase())
        );
      });
      setGivers(filteredGivers);
    }
  }

  const buttonStyle =
    "font-semibold py-2 p-4 m-4 w-40 items-center justify-center flex flex-col rounded-full";

  let prevStyle = buttonStyle;
  if (currentPage === 0) {
    prevStyle += " text-slate-600 cursor-not-allowed";
  } else {
    prevStyle += " hover:text-red-600";
  }
  let nextStyle = buttonStyle;
  if (endIndex === givers.length) {
    nextStyle += " text-slate-600 cursor-not-allowed";
  } else {
    nextStyle += " hover:text-red-600";
  }

  return (
    <div className="bg-slate-200 w-4/5 flex flex-col items-center p-2 h-screen">
      <div className="w-max my-2 flex flex-row items-center justify-between gap-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-96 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
          onChange={(e) => filterByName(e.target.value)}
        />
        <div>
          <p className="inline">Filtrer par groupe sanguin : </p>
          <select
            className="w-24 rounded-md focus:ring-2 focus:outline-none ring-red-600 p-1"
            onChange={(e) => filterByGroupe(e.target.value)}
          >
            <option value="tout">Tout</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>
      <div
        className={`items-center justify-center gap-2 w-full ${
          givers.length !== 0 && "grid grid-cols-3"
        }`}
      >
        {givers.length !== 0 ? (
          paginatedGivers.map((giver, index) => (
            <Giver
              key={index}
              nom={giver.nom}
              prenom={giver.prenom}
              dateNaissance={giver.date_naissance}
              groupe={giver.groupe_sanguin}
              sexe={giver.sexe}
              email={giver.email}
            />
          ))
        ) : (
          <p className="text-2xl text-center font-semibold my-20">
            Aucun donneur trouvé
          </p>
        )}
      </div>
      <div className="flex flex-row items-center">
        <button onClick={handlePreviousPage} className={prevStyle}>
          <IoIosArrowBack size={40} />
          <p>Précedent</p>
        </button>
        <p>{currentPage + 1}</p>
        <button onClick={handleNextPage} className={nextStyle}>
          <IoIosArrowForward size={40} />
          <p>Suivant</p>
        </button>
      </div>
    </div>
  );
}
