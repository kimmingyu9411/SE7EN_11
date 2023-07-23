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

// 이메일 인증
async function verifyEmail() {
  const email = $('#signupEmail').val();

  if (!email) return alert('이메일이 입력되지 않았습니다.');

  const obj = {
    email: email,
  };

  const fetchedData = await fetch('http://localhost:3030/users/mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then((d) => {
    return d.json();
  });

  const verifyNum = fetchedData.verifyNum;

  while (true) {
    const inputVerifyNum = $('#authCodeInput').val();
    if (inputVerifyNum == null) {
      break;
    } else {
      if (verifyNum == inputVerifyNum) {
        alert('인증되었습니다.');
        document.getElementById('verifyEmailBtn').disabled = true;
        document.getElementById('signupEmail').disabled = true;
        break;
      } else {
        alert('인증번호가 틀립니다.');
      }
    }
  }
}