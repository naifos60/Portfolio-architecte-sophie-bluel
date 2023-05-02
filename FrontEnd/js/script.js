/******** variables **********/
let gallery = document.querySelector(".gallery");
let galleryModal = document.querySelector(".gallery-modal");
const allFilters = document.querySelector("#all-filter");
const objectFilter = document.querySelector("#object-filter");
const appartementFilter = document.querySelector("#appartement-filter");
const hotelFilter = document.querySelector("#hotel-filter");
const edited = document.querySelectorAll(".edited");
const modalContainer = document.querySelector(".modal-container");
const modalTrigger = document.querySelectorAll(".modal-trigger");
const deleteBtn = document.querySelectorAll(".delete-btn");
const logout = document.querySelector(".logout");
const token = sessionStorage.getItem("token");

/******function **********/
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
async function deleteWork(dataId){
    await fetch("http://localhost:5678/api/works/" + dataId,{
        method: "DELETE",
        headers: {
            "accept" : "*/*",
            "Authorization": "Bearer"+ token
        }
    }).then(response => {
        console.log(response.body);
        return response.json();
    })
};

async function addWorks(){
    await fetch("http://localhost:5678/api/works",{
    method : "GET",
    headers : {
        "Accept" : "application/json"
    }
}).then(response => {
    return response.json();
}).then(datas => {
    if(objectFilter.checked){
        console.log("objet checked");
        const object = datas.filter(data => data.categoryId === 1);
        generateWork(object);
    }
    else if(appartementFilter.checked){
        console.log("appartement checked");
        const appartement = datas.filter(data => data.categoryId === 2);
        generateWork(appartement);
    }
    else if(hotelFilter.checked){
        console.log("hotel checked");
        const hotel = datas.filter(data => data.categoryId === 3);
        generateWork(hotel);
    }
    else{
        generateWork(datas);
        modalGenerateWork(datas);
      }
   })
};
function edit(){
    let token = sessionStorage.getItem("token");
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
    }
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
         buttonDelete.addEventListener("click", deleteWork(dataId));
        figCaption.innerHTML = "éditer";       
        figure.appendChild(img);
        figCaption.appendChild(buttonDelete);
        figure.appendChild(figCaption);
        galleryModal.appendChild(figure);
    }
};
function toggleModal(){
    modalContainer.classList.toggle("active");
}

/****** ajout initial de la gallerie ******/
addWorks();
edit();
console.log(sessionStorage);
/****** listener filtre *********/
document.querySelector(".logout").addEventListener("click", function(){
    sessionStorage.removeItem("token");
})
allFilters.addEventListener("click", function(){
    console.log("all checked");
    gallery.innerHTML = "";
    addWorks();
});

objectFilter.addEventListener("click",function(){
    console.log("objet checkd");
    gallery.innerHTML = "";
    addWorks();
    });


hotelFilter.addEventListener("click", function(){
    console.log("hotel checked");
    gallery.innerHTML = "";
    addWorks();

});

appartementFilter.addEventListener("click", function(){
    console.log("appart checked");
    gallery.innerHTML = "";
    addWorks();
});

modalTrigger.forEach(trigger => trigger.addEventListener("click", toggleModal));
    