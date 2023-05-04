import {generateWork, modalGenerateWork} from "../script.js";
import { gallery, filter, objectFilter, appartementFilter, hotelFilter} from "./variables.js";

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
            `<input type="radio" id="filter-0" name="filter">
            <label for="filter-0"  class="0-filter" >Tous</label>`
            +
            category.map((category) => 
                `<input type="radio" id="filter-${category.id}" name="filter">
                <label for="filter-${category.id}"  class=${category.id}-filter">${category.name}</label>`
            ).join("");
            console.log(filter);
            })
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
            generateWork(datas);
            modalGenerateWork(datas); 
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