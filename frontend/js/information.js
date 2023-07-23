const cookies = document.cookie.split(";");
const getUserinfo = async () => {
  await fetch("http://localhost:8080/users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      $(".information").empty();
      if (res.data.isOwner) {
        const ownerId = res.data.id;
        const ownerNickname = res.data.nickname;
        const ownerName = res.data.name;
        const ownerEmail = res.data.email;
        const ownerPoint = res.data.point;
        const ownerStoreName = res.data.store.name;
        const ownerAddress = res.data.address;
        const ownerinfo = document.createElement("div");
        ownerinfo.innerHTML = `<h1>사장님 정보</h1>
                                <li class="userId" id="userId">${ownerId}</li>
                                <div>
                                <strong>이 름&nbsp&nbsp&nbsp</strong>
                                <input disabled placeholder="${ownerName}" />
                                </div>
                                    <div>
                                        <strong>닉네임&nbsp</strong>
                                        <input disabled placeholder="${ownerNickname}" />
                                    </div>
                                    <div>
                                        <strong>이메일&nbsp</strong>
                                        <input disabled placeholder="${ownerEmail}" />
                                    </div>
                                    <div>
                                        <strong>포인트&nbsp</strong>
                                        <input disabled placeholder="${ownerPoint} P" /><button>내역조회</button>
                                    </div>
                                    <div>
                                        <strong>찜정보&nbsp</strong>
                                        <input disabled placeholder="${ownerStoreName}" />
                                        <button onclick="openStoerModal()">
                                        매장관리
                                        </button>
                                    </div>
                                    <div>
                                    <button onclick="openOwnerModal()">정보수정/삭제</button>
                                    </div>
                                        <!-- 매장모달창 -->
                                    <div class="modal" id="stoerModal">
                                        <div class="modal-content">
                                                        <!-- 모달창 내용 -->
                                        <h2>메뉴 등록</h2>
                                    <div>
                                        <strong>상품이름&nbsp</strong>
                                        <input
                                        placeholder="상품명을 입력해주세요."
                                        onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '상품명을 입력해주세요.'"/>
                                    </div>
                                    <div>
                                        <strong>가격&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong>
                                        <input
                                        placeholder="가격을 입력해주세요."
                                        onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '가격을 입력해주세요.'"/>
                                    </div>
                                    <div>
                                        <strong>카테고리&nbsp</strong>
                                    <input
                                        placeholder="카테고리를 입력해주세요."
                                        onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '카테고리를 입력해주세요.'"/>
                                       <button>선택</button>
                                    </div>
                                    <div>
                                        <strong>이미지&nbsp&nbsp&nbsp&nbsp</strong>
                                        <input
                                        placeholder="상품 이미지를 넣어주세요."
                                        onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '상품 이미지를 넣어주세요.'"/>
                                        <button>등록</button>
                                    </div>
                                        <button onclick="closeStoerModal()" class="closeBtn">메뉴 등록</button>
                                        </div>
                                    </div>
                                                    <!-- 유저모달창 -->
                                                    <div class="modal" id="ownerModal">
                                                        <div class="modal-content">
                                                                        <!-- 모달창 내용 -->
                                                        <h2>정보 수정/삭제</h2>
                                                    <div>
                                                        <strong>이름&nbsp</strong>
                                                        <input id="name"
                                                        placeholder="${ownerName}"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '${ownerName}'"/>
                                                    </div>
                                                    <div>
                                                        <strong>주소&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="address"
                                                        placeholder="${ownerAddress}"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '${ownerAddress}'"/>
                                                    </div>
                                                    <div>
                                                        <strong>닉네임&nbsp</strong>
                                                    <input id="nickname"
                                                        placeholder="${ownerNickname}"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '${ownerNickname}'"/>
                                                    </div>
                                                    <div>
                                                        <strong>비밀번호&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="password"
                                                        placeholder="현재 비밀번호를 입력하세요(필수)"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '현재 비밀번호를 입력하세요(필수)'"/>
                                                    </div>
                                                    <div>
                                                        <strong>new 비밀번호&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="newPassword"
                                                        placeholder="새 비밀번호를 입력하세요"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '새 비밀번호를 입력하세요'"/>
                                                    </div>
                                                    <div>
                                                        <strong>new 비밀번호 확인&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="newConfirm"
                                                        placeholder="새 비밀번호 확인란"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '새 비밀번호 확인란'"/>
                                                    </div>
                                                    <div>
                                                        <button onclick="updateOserinfo()" class="closeBtn">정보 수정</button>
                                                    </div>
                                                    <div>
                                                        <button onclick="closeOwnerModal()" class="closeBtn2">닫기</button>
                                                    </div>
                                                    <div>
                                                    <button onclick="deleteUserinfo()" class="closeBtn3">회원 탈퇴</button>
                                                    </div>
                                                        </div>
                                                    </div>
                                                    `;
        document.querySelector(".information").appendChild(ownerinfo);
      } else {
        const userId = res.data.id;
        const userNickname = res.data.nickname;
        const userName = res.data.name;
        const userEmail = res.data.email;
        const userPoint = res.data.point;
        const userAddress = res.data.address;
        const userinfo = document.createElement("div");
        userinfo.innerHTML = `<h1>내 정보</h1>
                                <li class="userId" id="userId">${userId}</li>
                                <div>
                                <strong>이 름&nbsp&nbsp&nbsp</strong>
                                <input disabled placeholder="${userNickname}" />
                                </div>
                                    <div>
                                        <strong>닉네임&nbsp</strong>
                                        <input disabled placeholder="${userName}" />
                                    </div>
                                    <div>
                                        <strong>이메일&nbsp</strong>
                                        <input disabled placeholder="${userEmail}" />
                                    </div>
                                    <div>
                                        <strong>포인트&nbsp</strong>
                                        <input disabled placeholder="${userPoint} P" /><button>내역조회</button>
                                    </div>
                                    <div>
                                    <button onclick="openUserModal()">정보수정/삭제</button>
                                    </div>
                                                            <!-- 유저모달창 -->
                                                    <div class="modal" id="userModal">
                                                        <div class="modal-content">
                                                                        <!-- 모달창 내용 -->
                                                        <h2>정보 수정/삭제</h2>
                                                    <div>
                                                        <strong>이름&nbsp</strong>
                                                        <input id="name"
                                                        placeholder="${userName}"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '${userName}'"/>
                                                    </div>
                                                    <div>
                                                        <strong>주소&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="address"
                                                        placeholder="${userAddress}"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '${userAddress}'"/>
                                                    </div>
                                                    <div>
                                                        <strong>닉네임&nbsp</strong>
                                                    <input id="nickname"
                                                        placeholder="${userNickname}"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '${userNickname}'"/>
                                                    </div>
                                                    <div>
                                                        <strong>비밀번호&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="password"
                                                        placeholder="현재 비밀번호를 입력하세요(필수)"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '현재 비밀번호를 입력하세요(필수)'"/>
                                                    </div>
                                                    <div>
                                                        <strong>new 비밀번호&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="newPassword"
                                                        placeholder="새 비밀번호를 입력하세요"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '새 비밀번호를 입력하세요'"/>
                                                    </div>
                                                    <div>
                                                        <strong>new 비밀번호 확인&nbsp&nbsp&nbsp&nbsp</strong>
                                                        <input id="newConfirm"
                                                        placeholder="새 비밀번호 확인란"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = '새 비밀번호 확인란'"/>
                                                    </div>
                                                    <div>
                                                        <button onclick="updateUserinfo()" class="closeBtn">정보 수정</button>
                                                    </div>
                                                    <div>
                                                        <button onclick="closeUserModal()" class="closeBtn2">닫기</button>
                                                    </div>
                                                    <div>
                                                    <button onclick="deleteUserinfo()" class="closeBtn3">회원 탈퇴</button>
                                                    </div>
                                                        </div>
                                                    </div>
                                                    `;

        document.querySelector(".information").appendChild(userinfo);
      }
    });
};
getUserinfo();

const updateUserinfo = async () => {
  const userId = document.getElementById("userId").innerText;
  const req = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    nickname: document.getElementById("nickname").value,
    password: document.getElementById("password").value,
    newPassword: document.getElementById("newPassword").value,
    newConfirm: document.getElementById("newConfirm").value,
  };
  await fetch(`http://localhost:8080/users/${userId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message) {
        alert(res.message.message);
      }
    })
    .catch((err) => {
      console.error("프로필 수정 중 에러 발생");
    });
};

const deleteUserinfo = async () => {
  const userId = document.getElementById("userId").innerText;
  const req = {
    password: document.getElementById("password").value,
  };
  await fetch(`http://localhost:8080/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        alert(res.message.message);
      }
    })
    .catch((err) => {
      console.error("프로필 삭제 중 에러 발생");
    });
};