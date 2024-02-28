import { useState, useContext } from "react";
import backgroundImage from "../assets/doctors.jpg";
import logo from "../assets/sps_logo.png";
import user from "../assets/account.png";
import Progress from "../components/Progress.jsx";
import { AuthContext } from "../utils/Context.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const { login } = useContext(AuthContext);

  const emails = {
    cnts: "cnts@gmail.com",
    afagnan: "afagnan@gmail.com",
    tokoin: "tokoin@gmail.com",
    kpalime: "kpalime@gmail.com",
    kara: "kara@gmail.com",
    dapaong: "dapaong@gmail.com",
  };

  async function signIn() {
    setIsWaiting(true);
    await login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(true);
      });
    setIsWaiting(false);
  }

  return (
    <div className="h-screen relative w-full">
      {isWaiting && <Progress />}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="flex flex-col items-center absolute left-20 top-1/2 transform -translate-y-1/2 text-white text-center">
        <p>
          <img src={logo} alt="Logo" className="w-32 mx-auto mb-4" />
        </p>
        <div className="flex flex-col items-center">
          <h2 className="text-6xl font-belleza my-8">Welcome Back</h2>
          <p className=" border-b-4 border-red-600 w-1/5 rounded-sm h-4"></p>
          <p className="my-8 font-light font-sans">
            Votre application de gestion <br /> de banque de sang préférée
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center absolute top-1/2 w-1/3 h-4/5 right-20 transform -translate-y-1/2 bg-red-700 bg-opacity-75 p-6 rounded-3xl">
        <h2 className="text-2xl font-belleza text-white mb-4">CONNEXION</h2>
        <p>
          <img src={user} alt="user" className="w-24 mx-auto mb-4" />
        </p>
        <div className="w-full">
          <div className="mb-8 mx-4">
            <select
              id="center"
              name="center"
              defaultValue=""
              onChange={(e) => setEmail(emails[e.target.value])}
              className="mt-1 block w-full py-2 px-3 border border-white bg-white rounded-xl"
            >
              <option value="" disabled>
                Choisir le centre
              </option>
              <option value="cnts">
                Centre National de Transfusion Sanguine (CNTS)
              </option>
              <option value="tokoin">
                Poste de Collecte et de Distribution Tokoin CHU (PCD Tokoin)
              </option>
              <option value="afagnan">
                Poste de Collecte et de Distribution Afagnan (PCD Afagnan)
              </option>
              <option value="kpalime">
                Poste de Collecte et de Distribution Kpalimé (PCD Kpalimé)
              </option>
              <option value="kara">
                Poste de Collecte et de Distribution Kara (PCD Kara)
              </option>
              <option value="dapaong">
                Poste de Collecte et de Distribution Dapaong (PCD Dapaong)
              </option>
            </select>
          </div>
          <div className="mb-6 mx-4">
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full py-2 px-3 border border-white ${
                error ? "bg-red-200" : "bg-white"
              } rounded-xl`}
            />
          </div>
          {error && <p className="text-orange-950">Mot de passe Invalid</p>}
          <div className="flex justify-between items-center mx-4 mt-8">
            <button
              className="bg-white text-red-600 py-2 px-4 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-600 focus:text-white"
              onClick={signIn}
            >
              Se connecter
            </button>

            <button className="underline text-white hover:text-blue-500">
              Mot de passe oublié ?
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-white">
            Vous ne trouvez pas votre centre de don dans la liste ?{" "}
            <button className="hover:text-blue-500 underline">
              Contactez-nous
            </button>{" "}
            pour créer un compte.
          </p>
        </div>
      </div>
    </div>
  );
}
