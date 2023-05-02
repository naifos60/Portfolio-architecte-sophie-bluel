export async function addCategory(){
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
export async function getWorks(){
    await fetch("http://localhost:5678/api/works",{
    method : "GET",
    headers : {
        "Accept" : "application/json"
    }
}).then(response => {
    return response.json();
})
};

export async function deleteWork(dataId){
    await fetch("http://localhost:5678/api/works/" + dataId,{
        method: "DELETE",
        headers: {
            "accept" : "*/*",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
        }
    }).then(response => {
        console.log(response.body);
        return response.json();
    }).then(deletes => {
        console.log(deletes);
        return deletes;
    })
};