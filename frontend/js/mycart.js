const cookies = document.cookie.split('; ');
const option={
method:'GET',
header:{
"Content-Type":"application/json",
"Authorization":cookies[0],
"refreshToken":cookies[1]
}
};
const getCart = fetch(`http://localhost:8080/cart`,{credentials: "include"},option)
  .then((response) => response.json())
  .then((data) => {
    return console.log(data);
  });
