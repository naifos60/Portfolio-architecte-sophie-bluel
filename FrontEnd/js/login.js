/********** function ********/
async function logUser(){
    const emailUser = document.querySelector("#mail_log").value;
    const passwordUser = document.querySelector("#password_log").value;
    const infoUser = {
        email: emailUser,
        password: passwordUser
    };
    const identify = JSON.stringify(infoUser);      
    await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: identify
    }).then(response => {
        if(response.ok){
            window.location.assign("./edit.html");
        }else{
            document.querySelector(".error_message").style.display = "block";
           console.log(response); 
        }
    })
    console.log(identify);
};
/********* ajout listener submit *********/
document.querySelector(".submit_form").addEventListener("click", function(e){
    e.preventDefault();
    logUser();
});