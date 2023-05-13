import {modalTrigger, logout, titleModal, galleryModal,modal} from "./modules/variables.js";
import {edit, toggleModal, generateAddModal, addWorks, addCategory} from "./modules/model.js";


async function init(){
    await addCategory();
    await addWorks();
          edit();
};

/****** ajout initial de la gallerie ******/
init();
console.log(localStorage);

/****** listener edit ******/

logout.addEventListener("click", function(){localStorage.removeItem("token");});

/****** listener modal ******/
    
modalTrigger.forEach(trigger => trigger.addEventListener("click", function(){
    toggleModal();
    modal.style.padding = "48px 0px";
    titleModal.innerHTML = "Galerie photo";
    galleryModal.innerHTML = "";
    document.querySelector(".add-pics").style.display = "inline-block";
    document.querySelector(".add-pics").setAttribute("value", "Ajouter une photo");
    document.querySelector(".add-pics").classList.remove("validate-pics");
    document.querySelector(".delete-a").style.display = "block";
    galleryModal.style.padding = "0px 0px 47px";
    galleryModal.style.borderBottom = "1px solid #B3B3B3";
    galleryModal.style.width = "420px";
    if(document.querySelector(".arrow-left") != undefined){
        document.querySelector(".arrow-left").remove();
    }
  })    
);

document.querySelector(".add-pics").addEventListener("click", function(e){
    e.preventDefault();
    generateAddModal();
});