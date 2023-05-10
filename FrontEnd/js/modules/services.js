import {urlApi} from "./variables.js";

async function getCategory(){
    const request = await fetch(urlApi + "categories",{
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    })
    if(!request.ok){
        throw new Error("ereur API");
    }
    const result = await request.json();
    return result;
    // }).then(category => {
    //         filter.innerHTML =
    //         `<input type="radio" id="filter-0" name="filter" checked>
    //         <label for="filter-0"  class="0-filter" >Tous</label>`
    //         +
    //         category.map((category) => 
    //             `<input type="radio" id="filter-${category.id}" name="filter">
    //             <label for="filter-${category.id}"  class=${category.id}-filter">${category.name}</label>`
    //         ).join("");
    //         console.log(filter);
    // });                      
};


 async function getWorks(){
    const request = 
    await fetch(urlApi + "works",{
        method : "GET",
        headers: {
            "accept": "application/json"
            }
    })
    if(!request.ok){
        throw new Error("ereur API");
    }
    const result = await request.json();
    return result;
};



async function deleteWork(dataId){
    const token = localStorage.getItem("token");
    await fetch(urlApi + "works/" + dataId,{
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


export { deleteWork, getCategory, getWorks};