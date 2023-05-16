import {gallery, galleryModal, edited, modalContainer, modal, filter} from "../modules/variables.js";
import {deleteWork, getWorks, getCategory, postWorks} from "./services.js";

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

/** cette fonction récupère les projets sur l'API puis les affiches dans les galleries selon la condition qui est respectée au moment de l'appel de la fonction */
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
                gallery.innerHTML = "";
                modalGenerateWork(datas); 
                generateWork(datas);                              
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

/** cette fonction récupère les catégories disponible dans l'API puis ajoute un filtre pour chaque catégorie */
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


/** cette fonction vérifie qu'un token a bien était généré et affiche tout les éléments caché du mode édition ou les caches */
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

/** cette fonction prend en paramètre un tableau d'éléments puis génère la galerie de la modal
 * En créant une image un button delete et un lien éditer pour chaque éléments */
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

  /** cette fonction ouvre une fenêtre de confirmation à l'utilisateur et appelle la fonction qui supprime les projets en cas de confirmation de l'utilisateur */  
function confirmDelete(workId){
    let result = confirm("Voulez-vous vraiment supprimer le projet "+ workId);
    if(result){
        deleteWork(workId);
    }else{
        console.log("suppression annulée");
    }
};

/** cette fonction ajoute ou retire la classe active au modal  container et affiche les projets  */
function toggleModal(){
    modalContainer.classList.toggle("active");
    addWorks();
};

/** cette fonction récupère le chemin d'accès de l'mage uploader par l'utilisateur */
function getFile(){
    const inputImg = document.querySelector(".file-project");
    let file = inputImg.files[0];
    return file;
}

/** cette fonction récupère le titre entrée par l'utilisateur */
function getTitle(){
    let inputTitle = document.querySelector("#title_work-input");
    let title =inputTitle.value;
    return title;
};

/** cette fonction récupère la catégorie choisie par l'utilisateur */
function getCategorie(){   
        let inputCategory = document.querySelector(".category-project");
        let category = inputCategory.value;
    return category;
};

/** cette fonction permet de rendre le submit du formulaire cliquable par l'utilisateur en vérifiant que les données nécessaire à l'envoie sont toutes présentes */
function validForm(){
    const img = document.querySelector(".file-project").files[0];
    const title = document.querySelector(".title-project").value;
    const cat = document.querySelector(".category-project").value;
    if(img != undefined && title != "" && cat != "default"){
        document.querySelector(".validate-pics").classList.remove("disabled");
        document.querySelector(".validate-pics").classList.add("enabled");
        document.querySelector(".validate-pics").removeAttribute("disabled");
    }else{
        document.querySelector(".validate-pics").classList.add("disabled");
        document.querySelector(".validate-pics").classList.remove("enabled");
        document.querySelector(".validate-pics").setAttribute("disabled",true);
    }
};

/** cette fonction récupère l'image uploader par l'utilisateur et l'affiche dans le label */
 async function addPicsOnLabel(){
    let file = await getFile();
    if(file.type === "image/png" || file.type === "image/jpg"){
    let preview = document.createElement("img");
    preview.style.width= "129px";
    preview.style.height= "100%";
    preview.classList.add("preview-img");
    preview.src = URL.createObjectURL(file);
    document.querySelector(".file-input").innerHTML = "";      
    document.querySelector(".file-input").appendChild(preview);
    }else{
        alertFormatImg();
    }
};

/** cette fonction génère les éléments du messages d'erreur du controle du format de l'image uploader par l'utilisateur */
function alertFormatImg(){
    const formatImg = document.createElement("div");
        const buttonAdd = document.createElement("div");
        const alert = document.querySelector(".file-input");
        buttonAdd.innerHTML= "+ Ajouter photo";
        buttonAdd.style.borderRadius = "60px";
        buttonAdd.style.width = "150px";
        buttonAdd.style.height = "30px";
        buttonAdd.style.background = "#1D6154";
        buttonAdd.style.color = "#ffffff";
        buttonAdd.style.margin = "10px auto";
        buttonAdd.style.fontSize = "14px";
        buttonAdd.style.lineHeight = "29px";
        alert.innerHTML = "";
        formatImg.innerHTML = "";
        formatImg.innerHTML =`
        *** Format invalide ***
        Veuillez séléctionner un fichier
        (.png ou .jpg)`;
         
        formatImg.style.color = "red";
        formatImg.style.fontSize = "27px";
        formatImg.style.lineHeight = "40px";
        formatImg.style.border = "1px solid red";
        formatImg.style.background = "#ffffff";
        formatImg.style.height = "100%";
        formatImg.style.textAlign = "center"
        alert.appendChild(formatImg);
        formatImg.appendChild(buttonAdd);
};

/** cette fonction re génère dynamiquement la première interface notre modal la suppression de projets */
function returnFirstModal(){
    let titleModal = document.querySelector(".modal-title");
    modal.style.padding = "48px";
    titleModal.innerHTML = "Galerie photo";
    galleryModal.innerHTML = "";
    document.querySelector(".add-pics").style.display = "inline-block";
    document.querySelector(".add-pics").setAttribute("value", "Ajouter une photo");
    document.querySelector(".delete-a").style.display = "block";
    galleryModal.style.padding = "0px 0px 47px";
    galleryModal.style.borderBottom = "1px solid #B3B3B3";
    galleryModal.style.width = "420px";  
};

/** cette fonction créer le formData du projet créer et envoie sont contenue à l'API */
async function addProject(){
    const formData = new FormData();
    const image = getFile();
    const title = getTitle();
    const category = getCategorie();
    const arrowLeft = document.querySelector(".arrow-left");
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
     
    await postWorks(formData).then(response => {
        if(response != Error){
        console.log("projet ajouté avec succès");
        gallery.innerHTML = "";
        returnFirstModal();      
        arrowLeft.remove();
        addWorks();
       }else{
        console.log(response.status);
        alert(`Échec de la création du projet.
         L'image doit être au format png ou jpg,
         d'une taille maximum de 4mo.
         Le titre du projet et sa catégorie 
         doivent obligatoirement être renseignés.`);
       }
    });
};

/** cette fonction récupère les categories et leur id puis génère les options du select de notre formulaire */
async function addSelect(){
    await getCategory().then(category => {        
        galleryModal.innerHTML = `<form class="modal-add">
    <label for="file-input" class="file-input">
        <i class="fa-solid fa-image"></i>
        <h4>+ Ajouter photo</h4>
        <p class="extension">jpg, png : 4mo max</p>
    </label>
    <input type="file" id="file-input" accept=".jpg, .png" class="file-project" required>
    <label for="title_work-input">Titre</label>
    <input type="text" id="title_work-input" class="title-project" required>
    <label for="category_work-input">Catégorie</label>
        <select class="category-project" required>
        <option value='default' selected></option>`
        +
        category.map((category) => 
        `<option value='${category.id}'>${category.name}</option>`)
        .join("")
        +
        `
         </select>
         <span></<span>
         <input type='submit' class= 'validate-pics disabled' value= 'valider' disabled>
         </form>`         
     });
};

/** cette fonction génère la deuxième interface de notre modal l'ajout de projet et inclu les listeners des différents éléments */
async function generateAddModal(){
    let arrowLeft = document.createElement("button");
    let titleModal = document.querySelector(".modal-title");
    arrowLeft.classList.add("arrow-left");
    arrowLeft.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    modal.appendChild(arrowLeft);
    modal.style.padding = "48px 48px 0px";
    titleModal.innerHTML = "Ajout photo";
    galleryModal.style.border = "none";
    galleryModal.style.padding = "0";
    galleryModal.style.width = "auto";
    galleryModal.innerHTML = "";
    document.querySelector(".add-pics").style.display = "none";
    document.querySelector(".delete-a").style.display = "none";
    await addSelect();

   /****** listener retour en arrière ******/
    arrowLeft.addEventListener("click", function(){
        returnFirstModal();  
        arrowLeft.remove();
        addWorks();
  });
  /***** listener affichage image séléctionnée dans label + append image formData *****/
  document.querySelector(".file-project").addEventListener("input", async function(e){
    e.preventDefault();
   await addPicsOnLabel();
    validForm();
  });
  /***** listener recuperation titre + append title formData *****/
  document.querySelector(".title-project").addEventListener("input", function(){
    getTitle();
    validForm();
  });
  /***** listener recuperation category + append category formData *****/
  document.querySelector(".category-project").addEventListener("input", function(){
    getCategorie();
    validForm();
  })
  /***** listener ajouter projet *****/
  document.querySelector(".validate-pics").addEventListener("click", async function(e){
    e.preventDefault();
    addProject();
  }); 
};




export {generateWork, edit, modalGenerateWork, toggleModal, confirmDelete, generateAddModal, addWorks, addCategory, returnFirstModal};
