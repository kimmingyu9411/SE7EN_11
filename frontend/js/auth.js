const url = new URLSearchParams(document.location.href);
const url2 = new URL(document.location.href);

async function login(){
    const jsonObj = {};
    jsonObj.email = $('#email').val();
    jsonObj.password = $('#password').val();
    
    // const cookies = document.cookie.split('; ');

    const options = {
        headers:{
            "Content-Type":"application/json",
            // "Authorization":cookies[0].split('=')[1],
            // "refreshToken":cookies[1].split('=')[1]
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
    if(accessToken&&refreshToken){
        location.href="./main.html"
    }
}

async function chk (){
    console.log('hi');
    const cookies = document.cookie.split('; ');
    console.log(cookies);
    console.log(window.localStorage.getItem('Authorization'));
    const option2 = {
    method: "GET",
    header: {
        "Content-Type": "application/json",
        Authoriation:window.localStorage.getItem('Authorization'),
        RefreshToken:window.localStorage.getItem('RefreshToken')
    },
    };
  const getCategory =  await fetch('http://localhost:8080/cart',option2)
  .then((response) => response.json());
  console.log(getCategory);
};
chk();
