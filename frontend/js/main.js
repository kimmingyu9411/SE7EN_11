const getAllStore = fetch("http://localhost:8080/stores/")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });

const getAllstores = () => {
  getAllStore.then((datas) => {
    $(".zonelist").empty();
    datas.data.forEach((store) => {
      const temp = document.createElement("ul");
      const storeAddress = store.address;
      temp.innerHTML = `<li class="storeAddress" onclick ="location.href='zone.html?id=${store.id}'">
                      <div><img src="./img/세븐일레븐일러스트.png"/></div>
                      <a>${storeAddress}</a>
                      </li>`;
      document.querySelector(".zonelist").append(temp);
    });
  });
};

const cookies = document.cookie.split(";");
const option = {
  method: "GET",
  header: {
    "Content-Type": "application/json",
    Authorization: cookies[0].split("=")[1],
    refreshToken: cookies[1].split("=")[1],
  },
};
const trnasBtn = async () => {
  await fetch("http://localhost:8080/users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      $(".sideBtn").empty();
      if (res.data.isOwner) {
        if (!res.data.store) {
          const ownerNickname = res.data.nickname;
          const btnName = document.createElement("div");
          btnName.innerHTML = `<button><a href="./information.html">${ownerNickname}</a></button>
                             <button onclick ='openStoerModal()'>스토어 생성</button>
                             <button onclick ='logout()'>로그아웃</button>`;
          document.querySelector(".sideBtn").appendChild(btnName);
        } else {
          const ownerNickname = res.data.nickname;
          const btnName = document.createElement("div");
          btnName.innerHTML = `<button><a href="./information.html">${ownerNickname}</a></button>
                             <button onclick ='logout()'>로그아웃</button>`;
          document.querySelector(".sideBtn").appendChild(btnName);
        }
      } else {
        const userNickname = res.data.nickname;
        const btnName = document.createElement("div");
        btnName.innerHTML = `<button><a href="./information.html">${userNickname}</a></button>
                             <button onclick ='logout()'>로그아웃</button>`;
        document.querySelector(".sideBtn").appendChild(btnName);
      }
    });
};
const logout = async () => {
  await fetch("http://localhost:8080/users/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
  location.href = "./main.html";
};

const storeCreate = async () => {
  const req = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
  };
  await fetch("http://localhost:8080/stores", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.Message) {
        alert(res.errorMessage);
      }else{
        alert(res.Message);
        location.href = "./main.html";
      }
    })
    .catch((err) => {
      console.error("프로필 수정 중 에러 발생");
    });
};
trnasBtn();
