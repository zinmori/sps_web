import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/sps_logo.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config.js";

function addDynamicPage(doc, title, headers, attributes, data) {
  doc.addPage();
  const table = [];
  data.forEach((item, index) => {
    const rowData = attributes.map((attribute) =>
      attribute === "date"
        ? new Date(item[attribute].seconds * 1000).toLocaleDateString()
        : item[attribute]
    );
    table.push([index + 1, ...rowData]);
  });

  const header = [headers];
  const rows = header.concat(table);
  doc.text(title, 20, 30);
  doc.autoTable({
    startY: 40,
    head: rows.slice(0, 1),
    body: rows.slice(1),
    styles: {
      cellPadding: 4,
      fontSize: 14,
      valign: "middle",
      halign: "center",
    },
    headStyles: {
      fillColor: [230, 0, 0],
    },
  });
}

function addFirstPage(doc, title) {
  const imgWidth = 50;
  const imgHeight = 50;
  const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
  doc.addImage(logo, "PNG", imgX, 100, imgWidth, imgHeight);

  doc.setFontSize(18);
  let textWidth = doc.getTextWidth("SANG POUR SANG");
  let textX = (doc.internal.pageSize.width - textWidth) / 2;
  doc.setTextColor(255, 0, 0);
  doc.text(textX, 180, "SANG POUR SANG");

  textWidth = doc.getTextWidth(title);
  textX = (doc.internal.pageSize.width - textWidth - 20) / 2;
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text(textX, 210, title);
  doc.text(textX, 240, "Du " + new Date().toLocaleDateString());
}

export const rapportGeneralPDF = async (email) => {
  const doc = new jsPDF();
  addFirstPage(doc, "RAPPORT GENERAL");
  const headers = ["#", "Groupe sanguin", "Quantite"];
  const attributes = ["groupe", "quantite"];
  const stockCollectionRef = collection(db, "stock", email, "banque");
  const stockSnapshot = await getDocs(stockCollectionRef);
  const stockList = stockSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const title =
    "Stock de sang disponible au " + new Date().toLocaleDateString();
  addDynamicPage(doc, title, headers, attributes, stockList);
  doc.save("rapport-general.pdf");
};

export const rapportEntreePDF = async (email) => {
  const doc = new jsPDF();
  addFirstPage(doc, "RAPPORT SUR LES ENTREES");
  const headers = ["#", "Date", "Groupe sanguin", "Quantite"];
  const attributes = ["date", "groupe", "quantite"];
  const entreeCollectionRef = collection(db, "dons", email, "data");
  const entreeSnapshot = await getDocs(entreeCollectionRef);
  const entreeList = entreeSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const title = "Les entrées de sang";
  addDynamicPage(doc, title, headers, attributes, entreeList);
  doc.save("rapport-entrees.pdf");
};

export const rapportSortiePDF = async (email) => {
  const doc = new jsPDF();
  addFirstPage(doc, "RAPPORT SUUR LES SORTIES");
  const headers = ["#", "Date", "Groupe sanguin", "Quantite", "Hôpital"];
  const attributes = ["date", "groupe", "quantite", "hopital"];
  const sortieCollectionRef = collection(db, "sorties", email, "data");
  const sortieSnapshot = await getDocs(sortieCollectionRef);
  const sortieList = sortieSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const title = "Les sorties de sang";
  addDynamicPage(doc, title, headers, attributes, sortieList);
  doc.save("rapport-sorties.pdf");
};

export const rapportUrgencePDF = async (email) => {
  const doc = new jsPDF();
  addFirstPage(doc, "RAPPORT SUR LES URGENCES");
  const centreSnapshot = (await getDocs(collection(db, "centres"))).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
  const centre = centreSnapshot.filter((doc) => doc.email === email)[0].nom;
  const headers = ["#", "Date", "Groupe sanguin", "Statut"];
  const attributes = ["date", "groupe", "satisfait"];
  const urgenceCollectionRef = collection(db, "urgences");
  const urgenceSnapshot = await getDocs(urgenceCollectionRef);
  const urgenceList = urgenceSnapshot.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
      satisfait: doc.data().satisfait ? "Satisfait" : "En cours",
    }))
    .filter((urgence) => urgence.centre === centre);
  const title = "Les urgences déclarées";
  addDynamicPage(doc, title, headers, attributes, urgenceList);
  doc.save("rapport-urgences.pdf");
};
