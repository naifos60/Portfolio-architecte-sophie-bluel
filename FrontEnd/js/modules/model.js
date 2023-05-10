import { gallery, galleryModal, edited, modalContainer, modal, filter} from "../modules/variables.js";
import { deleteWork, getWorks, getCategory} from "./services.js";

/**
 * la fonction prend un tableau comme argument puis récupère
 *  une image, un titre et un texte pour chaque élément
 *  de ce tableau afin de créer un projet pour ensuite ajouter ce projet à la gallerie.
 * @param {[]} array 
 */
 function generateWork(array){
    for(let i = 0; i < array.length; i++){
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

async function addWorks(){
     await getWorks().then(datas => {
            const allFilters = document.querySelector("#filter-0");   
            const objectFilter = document.querySelector("#filter-1");
            const appartementFilter = document.querySelector("#filter-2");
            const hotelFilter = document.querySelector("#filter-3");        
            const object = datas.filter(data => data.categoryId === 1);
            const appartement = datas.filter(data => data.categoryId === 2);
            const hotel = datas.filter(data => data.categoryId === 3);
            if(modalContainer.classList.contains("active")){
                modalGenerateWork(datas);                               
            }else if(gallery.firstElementChild == undefined){
                generateWork(datas);
            }else{
                galleryModal.innerHTML = ""; 
            }                          
            
        allFilters.addEventListener('click', function(){
                gallery.innerHTML = "";
                generateWork(datas);
        });
        objectFilter.addEventListener('click', function(){
                gallery.innerHTML = "";
                generateWork(object);
        });     
        appartementFilter.addEventListener('click', function(){
                gallery.innerHTML = "";
                generateWork(appartement);
        });     
        hotelFilter.addEventListener('click', function(){
            gallery.innerHTML = "";
            generateWork(hotel);
        });
    })
};

async function addCategory(){
    await getCategory().then(category => {
        filter.innerHTML =
        `<input type="radio" id="filter-0" name="filter" checked>
        <label for="filter-0"  class="0-filter" >Tous</label>`
        +
        category.map((category) => 
            `<input type="radio" id="filter-${category.id}" name="filter">
            <label for="filter-${category.id}"  class=${category.id}-filter">${category.name}</label>`
        ).join("");
    }); 
};



function edit(){
    let token = localStorage.getItem("token");
    if(token != null){
        edited.forEach(edite => {
            edite.style.display = "flex";
            document.querySelector(".portfolio_a").style.display = "contents";
        })
        document.querySelector(".header").setAttribute("class", "header_edit");
        document.querySelector(".nav").setAttribute("class", "edit_title-nav");
        document.querySelector(".logout").innerHTML = "";
        document.querySelector(".logout").innerHTML = "logout";
        document.querySelector(".filter").style.display = "none";
        document.querySelector(".portfolio_h2").setAttribute("class", "edit_h2");
        document.querySelector(".header_nav").style.margin = "0";
    }else{
        edited.forEach(edite => {
            edite.style.display = "none";
        })        
    };
};

function modalGenerateWork(array){
    for(let i = 0; i < array.length; i++){
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figCaption = document.createElement("figcaption");
        let buttonDelete = document.createElement("button");
        let modalIcone = document.createElement("i");
        let dataId = array[i].id
        img.src = array[i].imageUrl;
        buttonDelete.classList.add("delete-btn");
        buttonDelete.setAttribute("data-id", dataId);         
        modalIcone.setAttribute("class","fa-solid fa-trash-can");
        buttonDelete.appendChild(modalIcone);        
        figCaption.innerHTML = "éditer";       
        figure.appendChild(img);
        figCaption.appendChild(buttonDelete);
        buttonDelete.addEventListener("click", function(e){
            e.preventDefault();
            confirmDelete(dataId);
        });
        figure.appendChild(figCaption);
        galleryModal.appendChild(figure);        
    };
};

function generateAddModal(){
    let arrowLeft = document.createElement("button");
    let titleModal = document.querySelector(".modal-title");
    arrowLeft.classList.add("arrow-left");
    arrowLeft.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    modal.appendChild(arrowLeft);
    titleModal.innerHTML = "Ajout photo";
    galleryModal.style.border = "none";
    galleryModal.style.padding = "0";
    galleryModal.style.width = "auto";
    galleryModal.innerHTML = "";
    galleryModal.innerHTML = `<form class="modal-add">
    <label for="file-input" class="file-input">
        <i class="fa-solid fa-image"></i>
        <h4>+ Ajouter photo</h4>
        <p>jpg, png : 4mo max</p>
    </label>
    <input type="file" id="file-input" accept=".jpg, .png">
    <label for="title_work-input">Titre</label>
    <input type="text" id="title_work-input">
    <label for="category_work-input">Catégorie</label>
        <select>
            <option disabled selected>Choisissez une catégorie</option>
            <option>Objets</option>
            <option>Appartements</option>
            <option>Hôtels & restaurants</option>
        </select>	
</form>`;
    document.querySelector(".add-pics").setAttribute("value", "Valider");
    document.querySelector(".delete-a").style.display = "none";
    
    arrowLeft.addEventListener("click", function(){
    titleModal.innerHTML = "Galerie photo";
    galleryModal.innerHTML = "";
    document.querySelector(".add-pics").setAttribute("value", "Ajouter une photo");
    document.querySelector(".delete-a").style.display = "block";
    galleryModal.style.padding = "0px 0px 47px";
    galleryModal.style.borderBottom = "1px solid #B3B3B3";
    galleryModal.style.width = "420px";
    arrowLeft.remove();
    addWorks();
  });
};

function confirmDelete(workId){
    let result = confirm("Voulez-vous vraiment supprimer le projet "+ workId);
    if(result){
        deleteWork(workId);
    }else{
        console.log("suppression annulée");
    }
};

function toggleModal(){
    modalContainer.classList.toggle("active");
    addWorks();
};

export {generateWork, edit, modalGenerateWork, toggleModal, confirmDelete, generateAddModal, addWorks, addCategory};
