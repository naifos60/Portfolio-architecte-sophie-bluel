/******** variables **********/
let gallery = document.querySelector(".gallery");
let galleryModal = document.querySelector(".gallery-modal");
const allFilters = document.querySelector("#all-filter");
const objectFilter = document.querySelector("#object-filter");
const appartementFilter = document.querySelector("#appartement-filter");
const hotelFilter = document.querySelector("#hotel-filter");
const modalContainer = document.querySelector(".modal-container");
const modalTrigger = document.querySelectorAll(".modal-trigger");

/******function **********/
/**
 * la fonction prend un tableau comme argument puis récupère
 *  une image, un titre et un texte pour chaque élément
 *  de ce tableau afin de créer un projet pour ensuite ajouter ce projet à la gallerie.
 * @param {[]} array 
 */
function generateWork(array){
    for(let i = 0; i < array.length; i++){
        console.log(array[i]);
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figCaption = document.createElement("figcaption");
        img.src = array[i].imageUrl;
        img.alt = array[i].title;
        figCaption.innerHTML = array[i].title;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        gallery.appendChild(figure);
    }
};
/**
 * la function prend en paramètre un tableau d'éléments puis le parcours,
 * créer un projet en récuperant une image, une icone delete contenant en data l'id du projet, et un texte éditer,
 * puis ajoute chaque projet à la gallerie de la modal
 * @param {[]} array 
 */
function modalGenerateWork(array){
    for(let i = 0; i < array.length; i++){
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figCaption = document.createElement("figcaption");
        let modalIcone = document.createElement("i");
        let dataId = array[i].id
        img.src = array[i].imageUrl;
        modalIcone.setAttribute("class","fa-solid fa-trash-can");
        figCaption.innerHTML = "éditer";
        modalIcone.setAttribute("data-id", dataId);
        figure.appendChild(img);
        figCaption.appendChild(modalIcone);
        figure.appendChild(figCaption);
        galleryModal.appendChild(figure);
    }
};
/**
 * la fonction permet d'ajouter ou de retirer la class active au container principal de la modal
 */
function toggleModal(){
    modalContainer.classList.toggle("active");
}
/**
 * la fonction fait appel à l'API mis a disposition recupère une promise contenant un tableau d'objet,
 * récupère ce tableau dans une variable datas quelle place en paramètre  des fonctions qui génères les projets
 * dans la gallerie du site et dans la gallerie de la modal 
 */
async function addWorks(){
    await fetch("http://localhost:5678/api/works",{
    method : "GET",
    headers : {
        "Accept" : "application/json"
    }
}).then(response => {
    return response.json();
}).then(datas => {
        generateWork(datas);
        modalGenerateWork(datas);
    })
};

/****** ajout initial de la gallerie ******/
addWorks();
/******* gestion modal ********/
modalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal));