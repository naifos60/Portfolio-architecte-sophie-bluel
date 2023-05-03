import {generateWork, modalGenerateWork} from "../script.js";

/******* variables ******/
const objectFilter = document.querySelector("#object-filter");
const appartementFilter = document.querySelector("#appartement-filter");
const hotelFilter = document.querySelector("#hotel-filter");

async function addCategory(){
    await fetch("http://localhost:5678/api/categories",{
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    }).then(categories => {
        return categories.json();
    }).then(category => {
        return category;
    })
};

async function addWorks(){
    await fetch("http://localhost:5678/api/works",{
    method : "GET",
    headers : {
        "Accept" : "application/json"
    }
}).then(response => {
    console.log(response);
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

export { deleteWork, addWorks};