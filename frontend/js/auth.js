const url = new URLSearchParams(document.location.href);

async function login(){
    const jsonObj = {};
    jsonObj.email = $('#email').val();
    jsonObj.password = $('#password').val();
    
    const options = {
        headers:{
            "Content-Type":"application/json",
        },
        method:'POST',
        body:JSON.stringify(jsonObj)
    };

    const {message, accessToken, refreshToken } = await fetch('http://localhost:8080/users/login',options).then(d=>d.json());
    
    document.cookie=
        `Authorization=${accessToken};`;
    
    document.cookie=
        `refreshToken=${refreshToken}`;
    
    alert(message);
}