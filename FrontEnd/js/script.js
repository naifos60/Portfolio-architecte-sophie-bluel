import {addWorks, addCategory} from "./modules/services.js";
import {modalTrigger, logout, allFilters, hotelFilter, appartementFilter, objectFilter} from "./modules/variables.js";
import {edit, toggleModal} from "./modules/model.js";


/****** ajout initial de la gallerie ******/
addWorks();
addCategory();
edit();
console.log(sessionStorage);

/****** listener edit ******/
logout.addEventListener("click", function(){sessionStorage.removeItem("token");});
modalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal));

/****** listener filtre *********/
// allFilters.addEventListener("click", function(){
//     console.log("all checked");
//     gallery.innerHTML = "";
//     addWorks();
// });  
// // objectFilter.addEventListener("click",function(){
//     console.log("objet checkd");
//     gallery.innerHTML = "";
//     addWorks();
//     });
// hotelFilter.addEventListener("click", function(){
//     console.log("hotel checked");
//     gallery.innerHTML = "";
//     addWorks();
// });           
// appartementFilter.addEventListener("click", function(){
//     console.log("appart checked");
//     gallery.innerHTML = "";
//     addWorks();
// });