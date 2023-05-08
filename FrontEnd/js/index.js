import {addWorks, addCategory} from "./modules/services.js";
import {modalTrigger, logout} from "./modules/variables.js";
import {edit, toggleModal, generateAddModal} from "./modules/model.js";


/****** ajout initial de la gallerie ******/
addCategory();
addWorks();
edit();
console.log(sessionStorage);

/****** listener edit ******/
logout.addEventListener("click", function(){sessionStorage.removeItem("token");});
modalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal));

/****** listener modal ******/
document.querySelector(".add-pics").addEventListener("click", function(e){
    e.preventDefault();
    generateAddModal();
});