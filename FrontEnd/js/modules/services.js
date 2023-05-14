import {gallery, galleryModal, token, urlApi} from "./variables.js";
import {addWorks} from "./model.js";

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
    await fetch(urlApi + "works/" + dataId,{
        method: "DELETE",
        headers: {
            "accept" : "*/*",
            "Authorization": "Bearer " + token
        }
    }).then(response => {
        if(response.ok){
        gallery.innerHTML ="";
        galleryModal.innerHTML = "";
        addWorks();
        console.log("projet supprimé avec succès.");
        }
    })
};

async function postWorks(data){
    const request =
    await fetch(urlApi + "works",{
        method : "POST",
        headers : {
            "Authorization": "Bearer " + token
        },
        body: data
    })
    if(!request.ok){
        throw new Error("ereur API");
    }
    const result = await request.json();
    return result;
};

export { deleteWork, getCategory, getWorks, postWorks};