import homme from "../assets/homme.png";
import femme from "../assets/femme.png";

export default function Giver({
  nom,
  prenom,
  groupe,
  dateNaissance,
  sexe,
  email,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-white w-full p-2">
      <img
        src={sexe === "Feminin" ? femme : homme}
        alt="Donneur"
        className="w-24 p-2"
      />
      <div className="font-semibold text-center">
        <h1>Nom : {nom ? nom : "Inconnu"}</h1>
        <h1>Prenom : {prenom ? prenom : "Inconnu"}</h1>
        <h1>Groupe Sanguin : {groupe ? groupe : "Inconnu"}</h1>
        <h1>
          Date de Naissance :{" "}
          {dateNaissance
            ? new Date(dateNaissance.seconds * 1000).toLocaleDateString()
            : "Inconnu"}
        </h1>
        <h1>Email: {email ? email : "Inconnu"}</h1>
      </div>
    </div>
  );
}
