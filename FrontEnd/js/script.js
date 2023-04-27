/******** variables **********/
let gallery = document.querySelector(".gallery");
const allFilters = document.querySelector("#all-filter");
const objectFilter = document.querySelector("#object-filter");
const appartementFilter = document.querySelector("#appartement-filter");
const hotelFilter = document.querySelector("#hotel-filter");

/******function **********/
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
      }
   })
};

/****** ajout initial de la gallerie ******/
addWorks();

/****** listener filtre *********/
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


        