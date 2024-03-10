import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { SERVER_KEY } from "../constants.js";
import { AuthContext } from "./AuthContext.jsx";
import { StockContext } from "./StockContext.jsx";

export const UrgenceContext = createContext();

async function sendNotification(groupe, centre) {
  const notificationData = {
    notification: {
      title: "Urgence",
      body: `${centre} a besoin de ${groupe}. Faites un geste et sauvez des vies !`,
    },
    to: "/topics/urgence",
  };

  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization: `key=${SERVER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send notification");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Notification sent successfully:", data);
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
}

export const UrgenceProvider = ({ children }) => {
  const [urgences, setUrgences] = useState([]);
  const [limite, setLimite] = useState(0);
  const [CENTRES, setCENTRES] = useState([]);
  const { user } = useContext(AuthContext);
  const { stock } = useContext(StockContext);

  useEffect(() => {
    async function fetchUrgences() {
      const urgenceCollectionRef = collection(db, "urgences");
      const urgenceSnapshot = await getDocs(urgenceCollectionRef);
      const CENTRES = await getDocs(collection(db, "centres")).then(
        (querySnapshot) => {
          return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        }
      );
      const centre = CENTRES.find((centre) => centre.email === user.email);
      const urgenceList = urgenceSnapshot.docs
        .filter((doc) => doc.data().centre === centre.nom)
        .map((doc) => {
          const seconds = doc.data().date.seconds;
          return {
            ...doc.data(),
            date: new Date(seconds * 1000),
            id: doc.id,
          };
        });
      setUrgences(urgenceList);
      setCENTRES(CENTRES);
    }
    const limiteDocRef = doc(db, "limite", user.email);
    const getLimite = async () => {
      const data = await getDoc(limiteDocRef);
      setLimite(data.data().limite);
    };
    getLimite();
    fetchUrgences();
  }, [user.email]);

  async function checkAndAddUrgence(groupe, quantite) {
    const limitDoc = await getDoc(doc(db, "limite", user.email));
    const realLimite = limitDoc.data().limite;
    console.log("checkAndAddUrgence...");
    const centre = CENTRES.find((centre) => centre.email === user.email);
    for (let i = 0; i < urgences.length; i++) {
      if (
        urgences[i].groupe === groupe &&
        !urgences[i].satisfait &&
        urgences[i].centre === centre.nom
      ) {
        console.log("Unsatified urgence already exists for this groupe.");
        return;
      }
    }
    if (quantite >= realLimite) {
      console.log(realLimite, quantite, "Stock is sufficient for this groupe.");
      return;
    }
    const urgenceCollectionRef = collection(db, "urgences");

    console.log("Adding new urgence...");
    const newUrgence = {
      date: new Date(),
      groupe: groupe,
      satisfait: false,
      centre: centre.nom,
    };

    const newUrgenceWithIdRef = await addDoc(urgenceCollectionRef, newUrgence);
    const newUrgenceWithId = await getDoc(newUrgenceWithIdRef).then((doc) => ({
      ...doc.data(),
      date: new Date(doc.data().date.seconds * 1000),
      id: doc.id,
    }));
    setUrgences((urgences) => [newUrgenceWithId, ...urgences]);
    await sendNotification(groupe, centre.nom);
    //window.location.reload();
  }

  async function checkAndDelUrgence(groupe, quantite) {
    const limitDoc = await getDoc(doc(db, "limite", user.email));
    const realLimite = limitDoc.data().limite;
    if (quantite < realLimite) {
      console.log(
        realLimite,
        quantite,
        "Stock is insufficient for this groupe."
      );
      return;
    }
    const centre = CENTRES.find((centre) => centre.email === user.email);

    for (let i = 0; i < urgences.length; i++) {
      if (
        urgences[i].groupe === groupe &&
        !urgences[i].satisfait &&
        urgences[i].centre === centre.nom
      ) {
        console.log("Deleting urgence...");
        const urgenceRef = doc(db, "urgences", urgences[i].id);
        await updateDoc(urgenceRef, { satisfait: true });
        setUrgences((prevUrgences) =>
          prevUrgences.map((urgence) =>
            urgence.id === urgences[i].id
              ? { ...urgence, satisfait: true }
              : urgence
          )
        );
        return;
      }
    }
  }
  async function updateLimite(newLimite) {
    const oldLimite = limite;

    setLimite(newLimite);
    const limiteDocumentRef = doc(db, "limite", user.email);
    await updateDoc(limiteDocumentRef, { limite: parseInt(newLimite) });
    const groupes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    if (oldLimite < newLimite) {
      for (let i = 0; i < 8; i++) {
        const groupe = groupes[i];
        const quantite = stock.find((item) => item.groupe === groupe).quantite;
        await checkAndAddUrgence(groupe, quantite);
      }
    }
    if (oldLimite > newLimite) {
      for (let i = 0; i < 8; i++) {
        const groupe = groupes[i];
        const quantite = stock.find((item) => item.groupe === groupe).quantite;
        checkAndDelUrgence(groupe, quantite);
      }
    }
  }

  return (
    <UrgenceContext.Provider
      value={{
        urgences,
        checkAndAddUrgence,
        checkAndDelUrgence,
        limite,
        updateLimite,
      }}
    >
      {children}
    </UrgenceContext.Provider>
  );
};
