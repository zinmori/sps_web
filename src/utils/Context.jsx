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
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { SERVER_KEY } from "../../constants.js";

export const LimitContext = createContext();
export const AuthContext = createContext();
export const UrgenceContext = createContext();
export const StockContext = createContext();

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

async function sendNotification(groupe, email) {
  const notificationData = {
    notification: {
      title: "Urgence",
      body: `${email} a besoin de ${groupe}. Faites un geste et sauvez des vies !`,
    },
    to: "/topics/all",
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

export const LimitProvider = ({ children }) => {
  const [limite, setLimite] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const limiteDocRef = doc(db, "limite", user.email);
    const getLimite = async () => {
      const data = await getDoc(limiteDocRef);
      setLimite(data.data().limite);
    };
    getLimite();
  }, [user]);

  async function updateLimite(newLimite) {
    setLimite(newLimite);
    const limiteDocumentRef = doc(db, "limite", user.email);
    await updateDoc(limiteDocumentRef, { limite: parseInt(newLimite) });
  }

  return (
    <LimitContext.Provider value={{ limite, updateLimite }}>
      {children}
    </LimitContext.Provider>
  );
};

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

export const UrgenceProvider = ({ children }) => {
  const [urgences, setUrgences] = useState([]);
  const { user } = useContext(AuthContext);
  const { limite } = useContext(LimitContext);

  useEffect(() => {
    async function fetchUrgences() {
      const urgenceCollectionRef = collection(
        db,
        "urgences",
        user.email,
        "data"
      );
      const urgenceSnapshot = await getDocs(urgenceCollectionRef);

      const urgenceList = urgenceSnapshot.docs.map((doc) => {
        const seconds = doc.data().date.seconds;
        return {
          ...doc.data(),
          date: new Date(seconds * 1000),
          id: doc.id,
        };
      });
      setUrgences(urgenceList);
    }
    fetchUrgences();
  }, [user]);

  async function checkAndAddUrgence(groupe, quantite) {
    console.log("checkAndAddUrgence...");
    for (let i = 0; i < urgences.length; i++) {
      if (urgences[i].groupe === groupe && !urgences[i].satisfait) {
        console.log("Unsatified urgence already exists for this groupe.");
        return;
      }
    }
    if (quantite > limite) {
      console.log(limite, quantite, "Stock is sufficient for this groupe.");
      return;
    }
    const urgenceCollectionRef = collection(db, "urgences", user.email, "data");

    console.log("Adding new urgence...");
    const newUrgence = {
      date: new Date(),
      groupe: groupe,
      satisfait: false,
    };

    await addDoc(urgenceCollectionRef, newUrgence);
    setUrgences([newUrgence, ...urgences]);
    sendNotification(groupe, user.email);
  }

  async function checkAndDelUrgence(groupe, quantite) {
    if (quantite < limite) {
      console.log(limite, quantite, "Stock is insufficient for this groupe.");
      return;
    }
    const urgenceCollectionRef = collection(db, "urgences", user.email, "data");

    for (let i = 0; i < urgences.length; i++) {
      if (urgences[i].groupe === groupe && !urgences[i].satisfait) {
        console.log("Deleting urgence...");
        const urgenceRef = doc(urgenceCollectionRef, urgences[i].id);
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

  return (
    <UrgenceContext.Provider
      value={{ urgences, checkAndAddUrgence, checkAndDelUrgence }}
    >
      {children}
    </UrgenceContext.Provider>
  );
};

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchStock() {
      const stockCollectionRef = collection(db, "stock", user.email, "banque");
      const stockSnapshot = await getDocs(stockCollectionRef);
      const stockList = stockSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStock(stockList);
    }
    fetchStock();
  }, [user]);

  async function updateStock(groupe, quantite) {
    const stockCollectionRef = collection(db, "stock", user.email, "banque");
    const stockRef = doc(stockCollectionRef, groupe);
    const old = stock.find((item) => item.groupe === groupe);
    console.log(old.quantite, "Updating stock...");
    const newQuantite = old.quantite + quantite;
    await updateDoc(stockRef, { quantite: newQuantite });
    setStock((prevStock) =>
      prevStock.map((item) =>
        item.groupe === groupe ? { ...item, quantite: newQuantite } : item
      )
    );
    console.log(newQuantite, "Stock updated.");
    return newQuantite;
  }

  return (
    <StockContext.Provider value={{ stock, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
