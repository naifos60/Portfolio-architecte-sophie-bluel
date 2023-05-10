import {urlApi, token} from "./variables.js";

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
        console.log(response.body);
        return response.json();
    }).then(deletes => {
        console.log(deletes);
        return deletes;
    })
};

export { deleteWork, getCategory, getWorks};