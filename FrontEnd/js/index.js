import {modalTrigger, logout} from "./modules/variables.js";
import {edit, toggleModal, generateAddModal, addWorks, addCategory,returnFirstModal} from "./modules/model.js";


async function init(){
    await addCategory();
    await addWorks();
          edit();
};

/****** ajout initial de la gallerie ******/
init();

/****** listener edit ******/

logout.addEventListener("click", function(){localStorage.removeItem("token")});

/****** listener modal ******/
    
modalTrigger.forEach(trigger => trigger.addEventListener("click", function(){
    toggleModal();
    returnFirstModal();
    if(document.querySelector(".arrow-left") != undefined){
        document.querySelector(".arrow-left").remove();
    }
  })    
);

document.querySelector(".add-pics").addEventListener("click", function(e){
    e.preventDefault();
    generateAddModal();
});