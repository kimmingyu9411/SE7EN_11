const email = document.querySelector("#email"),
  password = document.querySelector("#password"),
  confirmPassword = document.querySelector("#confirmPassword"),
  address = document.querySelector("#address"),
  nickname = document.querySelector("#nickname"),
  namechk = document.querySelector("#name");
function signup() {
  let isOwner = document.getElementById("isOwner").checked;
  const req = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    address: address.value,
    nickname: nickname.value,
    name: namechk.value,
    isOwner: isOwner,
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
        location.href = "./auth.html";
      } else {
        alert(res.errorMessage);
      }
    })
    .catch((err) => {
      console.error("회원가입 중 에러 발생");
    });
}

// 모달 창 열기
document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "block";
});

// 모달 창 닫기
document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

// 확인 버튼 클릭 시 처리
document.getElementById("confirmBtn").addEventListener("click", function () {
  const authCode = document.getElementById("authCodeInput").value;
  const additionalInput = document.getElementById("additionalInput").value;

  // 여기에서 서버로 데이터를 전송하는 코드를 하면될까요!?.
  const formData = {
    authCode: authCode,
    additionalInput: additionalInput,
  };

  fetch("http://localhost:8080/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
});

// 이메일 인증
async function verifyEmail() {
  const email = $('#email').val();

  if (!email) return alert('이메일이 입력되지 않았습니다.');

  const obj = {
    email
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
        document.getElementById('email').disabled = true;
        break;
      } else {
        alert('인증번호가 틀립니다.');
      }
    }
  }
}
