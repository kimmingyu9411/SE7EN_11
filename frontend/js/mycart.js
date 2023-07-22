const cookies = document.cookie.split(";");
// console.log(cookies[0].split("=")[1])
// console.log(cookies[1].split("=")[1])
// console.log(document.cookie)
const option = {
  method: "GET",
  header: {
    "Content-Type": "application/json",
    Authorization: cookies[0].split("=")[1],
    refreshToken: cookies[1].split("=")[1],
  },
};
const getCartt = async () => {
  console.log(option);
  const response = await fetch("http://localhost:8080/cart", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    // option
  });

  console.log(response.status);
  return response.json();
};

const getCart = getCartt();
