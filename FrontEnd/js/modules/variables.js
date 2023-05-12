/******** variables **********/
 let gallery = document.querySelector(".gallery");
 let galleryModal = document.querySelector(".gallery-modal");
 let filter = document.querySelector(".filter_form");
 const edited = document.querySelectorAll(".edited");
 const modal = document.querySelector(".modal");
 const modalContainer = document.querySelector(".modal-container");
 const modalTrigger = document.querySelectorAll(".modal-trigger");
 const logout = document.querySelector(".logout");
const urlApi = "http://localhost:5678/api/";
let titleModal = document.querySelector(".modal-title");
let token = localStorage.getItem("token");
let formData = new FormData();
export {gallery, galleryModal, filter, edited, modalContainer, modalTrigger, logout, modal, urlApi, titleModal, token, formData};