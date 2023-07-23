let verifyNum;

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
function modalOpen() {
  const email = $("#email").val();

  if (!email) {
    return alert("이메일이 입력되지 않았습니다.");
  } else {
    document
      .getElementById("openModalBtn")
      .addEventListener("click", function () {
        document.getElementById("myModal").style.display = "block";
      });

    verifyEmail(email);
  }
}

// 모달 창 닫기
function modalClose() {
  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      document.getElementById("myModal").style.display = "none";
    });
}

// 이메일 인증
async function verifyEmail(email) {
  const obj = {
    email,
  };

  const fetchedData = await fetch("http://localhost:8080/users/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((d) => {
    return d.json();
  });
  
  if(fetchedData.ErrorMessage){
    alert(fetchedData.ErrorMessage);
  }else{
    verifyNum = fetchedData.verifyNum;
  }
}

function confirmVerifyNumber() {
  const inputVerifyNum = $("#authCodeInput").val();

  if (verifyNum == inputVerifyNum) {
    alert("인증되었습니다.");
    document.getElementById("openModalBtn").disabled = true;
    document.getElementById("email").disabled = true;
    return modalClose();
  } else {
    alert("인증번호가 틀립니다.");
  }
}

function modalOpenUserType() {
  document.getElementById("userTypeModal").style.display = "block";
}

// 모달 창 닫기 - 점주 여부 선택 모달
function modalCloseUserType() {
  document.getElementById("userTypeModal").style.display = "none";
}
