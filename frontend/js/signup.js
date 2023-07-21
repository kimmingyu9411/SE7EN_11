const email = document.querySelector("#email"),
  password = document.querySelector("#password"),
  confirmPassword = document.querySelector("#confirmPassword"),
  address = document.querySelector("#address"),
  nickname = document.querySelector("#nickname"),
  namechk = document.querySelector("#name");

function signup() {
  const req = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    address: address.value,
    nickname: nickname.value,
    name: namechk.value,
    isOwner:isOwner.value
  };
  fetch("http://localhost:8080/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        alert(res.message);
        location.href="./auth.html"
      } else {
        alert(res.errorMessage);
      }
    })
    .catch((err) => {
      console.error("회원가입 중 에러 발생");
    });
}
