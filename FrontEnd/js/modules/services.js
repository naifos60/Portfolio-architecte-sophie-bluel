import {filter, gallery, galleryModal, modalContainer} from "./variables.js";
import {generateWork, modalGenerateWork} from "./model.js";

async function addCategory(){
    await fetch("http://localhost:5678/api/categories",{
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    }).then(categories => {
        return categories.json();
    }).then(category => {
            filter.innerHTML =
            `<input type="radio" id="filter-0" name="filter">
            <label for="filter-0"  class="0-filter" >Tous</label>`
            +
            category.map((category) => 
                `<input type="radio" id="filter-${category.id}" name="filter">
                <label for="filter-${category.id}"  class=${category.id}-filter">${category.name}</label>`
            ).join("");
            console.log(filter);
    });                      
};


async function addWorks(){
    await fetch("http://localhost:5678/api/works",{
        method : "GET",
        headers: {
            "accept": "application/json"
            }
        }).then(response => {
            return  response.json();
        }).then(datas => {
            const allFilters = document.querySelector("#filter-0");   
            const objectFilter = document.querySelector("#filter-1");
            const appartementFilter = document.querySelector("#filter-2");
            const hotelFilter = document.querySelector("#filter-3");        
            const object = datas.filter(data => data.categoryId === 1);
            const appartement = datas.filter(data => data.categoryId === 2);
            const hotel = datas.filter(data => data.categoryId === 3);
            if(modalContainer.classList.contains("active")){
                modalGenerateWork(datas);                               
            }else{
                generateWork(datas);
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
    });       
 };



async function deleteWork(dataId){
    const token = sessionStorage.getItem("token");
    await fetch("http://localhost:5678/api/works/" + dataId,{
        method: "DELETE",
        headers: {
            "accept" : "*/*",
            "Authorization": "Bearer " + token
        }
    }).then(response => {
        console.log(response.body);
        return response.json();
    }).then(deletes => {
        console.log(deletes);
        return deletes;
    })
};


export { deleteWork, addWorks, addCategory};