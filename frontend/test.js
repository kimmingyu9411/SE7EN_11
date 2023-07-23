console.log('hi');

async function chk (){
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
