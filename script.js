// ----------------------------------------------------------------- //
//
// ------------------------ BACK OFFICE JS ------------------------ //
//
//--- CHARGEMENT DU FICHIER JSON
fetch("produits.json")

  .then(function(response) {
    if (!response.ok) {
      throw new Error("Erreur : Le fichier JSON n'a pas été chargé !");
    }
    return response.json();
  })
  .then(function(FichierJsonTableau) {
    ElementsjSON = FichierJsonTableau;

    //--- FUNCTION AFFICHAGE
    Affichage();
  })
  .catch(function(error) {
    console.error("Erreur : ", error);
  });
// ------------------------ HOME PAGE ------------------------ //
//
//--- INITIALISATION DU TABLEAU
let ElementsjSON = [];

// --- Fonction Afficher
function Affichage() {

  //--- ELEMENT HTML POUR TABLEAU
  let listeProduits = document.getElementById("container-data");

  if (listeProduits) {

    //--- VIDE LE TABLEAU
    listeProduits.innerHTML = "";

    //--- Récupérer les produits stockés dans localStorage et convertit JSON en Objet ou tableau
    let produitsStockés = JSON.parse(localStorage.getItem("produits")) || [];

    //--- FUSION DES DONNEES JSON + LOCALSTORAGE CONCATENATION DES 2 TABLEAUX (JSON + LOCALSTORAGE) EN UN SEUL
    let tousLesProduits = ElementsjSON.concat(produitsStockés);

    //---PARCOURS CHAQUE PRODUITS
    for (let i = 0; i < tousLesProduits.length; i++) {

      //--- AJOUT DES ELEMENTS DE LA BOUCLE JSON DANS VARIABLE
      let produit = tousLesProduits[i];

      //--- CREATION LIGNE TABLEAU
      let ligne = document.createElement("tr");
      ligne.classList.add("data");

      //--- IMG PRODUIT
      let imgProduitline = document.createElement("td");
      let imgBalise = document.createElement("img");
      imgBalise.src = "./imagesProduits/" + produit.photo;

      //--- CELULLE REFERENCE
      let celluleReference = document.createElement("td");
      celluleReference.textContent = produit.reference;

      //--- CELULLE CATEGORIE
      let celluleCategorie = document.createElement("td");
      celluleCategorie.textContent = produit.categorie;

      //--- CELULLE LIBELLE
      let celluleLibelle = document.createElement("td");
      celluleLibelle.textContent = produit.libelle;

      //--- CELULLE PRIX
      let cellulePrix = document.createElement("td");
      cellulePrix.textContent = produit.prix + "€";

      //--- CELULLE STOCK
      let celluleStock = document.createElement("td");
      celluleStock.textContent = produit.stock;
      // ---------------------------------------------------------------------------- //
      //--- CELULLE ACTIONS
      let colonneActions = document.createElement("td");

      //--- BOUTON DETAILS
      let boutonVoir = document.createElement("button");
      boutonVoir.classList.add("btn-details");
      boutonVoir.textContent = "Détails";

      //--- BOUTON MODIFIER
      let boutonModifier = document.createElement("button");
      boutonModifier.classList.add("cta-two");
      boutonModifier.textContent = "Modifier";

      //--- BOUTON SUPPRIMER
      let boutonSupprimer = document.createElement("button");
      boutonSupprimer.classList.add("cta-three");
      boutonSupprimer.textContent = "Supprimer";

      //--- SUPPESSION DATA DANS TABLEAU JSON+ DATA LOCALSTORAGE
      boutonSupprimer.addEventListener("click", function () {
        supprimer(i);
      });
      // ---------------------------------------------------------------------------- //
      //--- OUVERTURE MODALE DETAIL PRODUIT
      boutonVoir.addEventListener("click", function () {
        afficherDetails(produit);
      });
      // ---------------------------------------------------------------------------- //
      //--- AJOUTER BOUTONS AUX ACTIONS
      colonneActions.appendChild(boutonVoir);
      colonneActions.appendChild(boutonModifier);
      colonneActions.appendChild(boutonSupprimer);

      //--- AJOUTER TOUTES LES CELLULES À LA LIGNE
      imgProduitline.appendChild(imgBalise);
      ligne.appendChild(imgProduitline);
      //
      ligne.appendChild(celluleReference);
      ligne.appendChild(celluleCategorie);
      ligne.appendChild(celluleLibelle);
      ligne.appendChild(cellulePrix);
      ligne.appendChild(celluleStock);
      ligne.appendChild(colonneActions);

      //--- AJOUTER LA LIGNE AU TABLEAU HTML
      listeProduits.appendChild(ligne);
    // ---------------------------------------------------------------------------- //
    }
  }
}
//
// ------------------------ PAGE PRODUITS ------------------------------------ //
//
let btnAddProduit = document.getElementById("cta-save");

if (btnAddProduit) {

  btnAddProduit.addEventListener("click", function(event) {
    
    //--- EMPECHE RECHARGEMENT DE LA PAGE
    event.preventDefault();

    //---SELECTEURS
    let referenceProduits = document.getElementById("saisieReference").value;
    let categorieProduits = document.getElementById("selectCategorie").value;
    let libelleProduits = document.getElementById("idLibelle").value;
    let prixProduits = document.getElementById("idPrice").value;
    //

    //--- TABLEAU POUR OBJETS PRODUITS
    let nouveauProduit = {
      reference: referenceProduits,
      categorie: categorieProduits,
      libelle: libelleProduits,
      prix: prixProduits,
      stock: "Oui"
    };

    //--- Récupérer les produits stockés dans localStorage et convertit JSON en Objet ou tableau
    let produitsStockés = JSON.parse(localStorage.getItem("produits")) || [];

    //--- AJOUT DES PRODUITS DANS LE TABLEAU
    produitsStockés.push(nouveauProduit);

    //--- CONVERTIR LE TABLEAU EN CHAINE JSON (OBLIGATOIRE POUR LOCALSTORAGE) 
    localStorage.setItem("produits", JSON.stringify(produitsStockés));

    //--- REDIRECTION VERS HOME PAGE
    window.location.href = "index.html";
  });
}
// ----------------------------- BOUTON RETOUR --------------------------------- //
let boutonRetour = document.querySelector(".retour");

if (boutonRetour) {
  boutonRetour.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "index.html";
  });
}
// ----------------------------- BOUTON "+ Ajouter" --------------------------------- //
let boutonAjouter = document.querySelector(".ajouter");

if (boutonAjouter) {
  boutonAjouter.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "produits-ajout.html";
  });
}
// ----------------------------- SUPPRESSION DES PRODUITS --------------------------------- //
function supprimer(index) {
  
  //--- RECUPERATION DES PRODUITS
  let produitsStockés = JSON.parse(localStorage.getItem("produits")) || [];

  //--- VERIFICATION POUR SUPPRESSION DANS JSON OU LOCALSTORAGE
  if (index >= ElementsjSON.length) {

      //--- PRODUIT AJOUTE MANUELLEMENT LOCALSTORAGRE (splice -> permet de modifier un tableau)
      let indexLocalStorage = index - ElementsjSON.length;
      produitsStockés.splice(indexLocalStorage, 1);

      //--- CONVERTIR LE TABLEAU EN CHAINE JSON (OBLIGATOIRE POUR LOCALSTORAGE)
      localStorage.setItem("produits", JSON.stringify(produitsStockés));

  } else {
      //--- SUPPRIME ELEMENTS TABLEAU VIA INDEX LIGNE
      ElementsjSON.splice(index, 1);
  }

  //--- RAFRAICHISSEMENT DE LA PAGE
  Affichage();
}
// ----------------------------- MODAL DETAILS --------------------------------- //
//
function afficherDetails(produit) {

  let modalHTML = document.getElementById("modal");
  let dataModalHTML = document.querySelector(".dataModal");
  let buttonClose = document.querySelector(".close");

  //--- VIDE LE BLOCK HTML
  dataModalHTML.innerHTML = "";

  //---AJOUT DES DETAILS DU PRODUIT
  let details = [

    "Référence: " + produit.reference,
    "Catégorie: " + produit.categorie,
    "Libellé: " + produit.libelle,
    "Prix: " + produit.prix + "€",
    "Stock: " + produit.stock
  ];
  //---AJOUT DES ELEMENTS
  details.forEach(function(detail) {
    let textDATA = document.createElement("p");
    textDATA.textContent = detail;
    dataModalHTML.appendChild(textDATA);
  });

  //---AFFICHAGE MODAL
  modalHTML.style.display = "block";

  //--- FERMER LA MODAL
  buttonClose.addEventListener("click", function() {
    modalHTML.style.display = "none";
  });
}
//--- PERMET D'AFFICHER AU CHARGEMENT (LOCALSTORAGE)
document.addEventListener("DOMContentLoaded", Affichage);
// ---------------------------------------------------------------------------- //