import {generateWork, modalGenerateWork, generateFilter} from "../script.js";

/******* variables ******/
let filter = document.querySelector(".filter_form");

async function addCategory(){
    await fetch("http://localhost:5678/api/categories",{
        method : "GET",
        headers : {
            "Accept" : "application/json"
        }
    }).then(categories => {
        return categories.json();
    }).then(category => {
        console.log(category);
            filter.innerHTML =
            `<input type="radio" id="all-filter" name="filter">
            <label for="all-filter"  class="all-filter" >Tous</label>`;
             generateFilter(category);
    })
};

async function addWorks(){
    await fetch("http://localhost:5678/api/works",{
method : "GET",
headers: {
    "accept": "application/json"
    }
}).then(response => {
   if(response.ok){
        response.json().then(datas => {
        generateWork(datas);
        console.log(datas);
       })
     }else{
        console.log("erreur");
     }
  })
};



async function deleteWork(dataId){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
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