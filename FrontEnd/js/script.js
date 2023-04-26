/******** variables **********/
let gallery = document.querySelector(".gallery");
const allFilters = document.querySelector("#all-filter");
const objectFilter = document.querySelector("#object-filter");
const appartementFilter = document.querySelector("#appartement-filter");
const hotelFilter = document.querySelector("#hotel-filter");


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
        gallery.innerHTML = "";
        const object = datas.filter(data => data.categoryId === 1);
        for(let i = 0; i < object.length; i++){
            console.log(object[i]);
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figCaption = document.createElement("figcaption");
            img.src = object[i].imageUrl;
            img.alt = object[i].title;
            figCaption.innerHTML = object[i].title;
            figure.appendChild(img);
            figure.appendChild(figCaption);
            gallery.appendChild(figure);
    }}
    else if(appartementFilter.checked){
        console.log("appartement checked");
        gallery.innerHTML = "";
        const appartement = datas.filter(data => data.categoryId === 2);
        for(let i = 0; i < appartement.length; i++){
            console.log(appartement[i]);
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figCaption = document.createElement("figcaption");
            img.src = appartement[i].imageUrl;
            img.alt = appartement[i].title;
            figCaption.innerHTML = appartement[i].title;
            figure.appendChild(img);
            figure.appendChild(figCaption);
            gallery.appendChild(figure);
    }}
    else if(hotelFilter.checked){
        console.log("hotel checked");
        gallery.innerHTML = "";
        const hotel = datas.filter(data => data.categoryId === 3);
        for(let i = 0; i < hotel.length; i++){
            console.log(hotel[i]);
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figCaption = document.createElement("figcaption");
            img.src = hotel[i].imageUrl;
            img.alt = hotel[i].title;
            figCaption.innerHTML = hotel[i].title;
            figure.appendChild(img);
            figure.appendChild(figCaption);
            gallery.appendChild(figure);
    }}
    else{
        for(let i = 0; i < datas.length; i++){
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figCaption = document.createElement("figcaption");
             img.src = datas[i].imageUrl;
            img.alt = datas[i].title;
            figCaption.innerHTML = datas[i].title;
            figure.appendChild(img);
            figure.appendChild(figCaption);
            gallery.appendChild(figure);
      }}
   })
};

addWorks();


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


        