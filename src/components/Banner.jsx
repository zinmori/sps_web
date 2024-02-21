import logo from "../assets/logo_cercle.png";

export default function Banner() {
  return (
    <div className="flex flex-row justify-between items-center gap-2 h-40 my-2 border-b">
      <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
      <h1 className="font-bold text-red-700 font-sans uppercase">
        Sang pour Sang <br />
        <span className="font-light text-stone-800 normal-case">
          Tout pour sauver des vies
        </span>
      </h1>
    </div>
  );
}
