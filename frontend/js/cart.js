(function () {
  const urlParams = new URL(location.href).searchParams;
  const productid = urlParams.get("id");

  // 상품 정보를 서버로부터 가져오는 함수
  async function getProduct(productId) {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(
      `http://localhost:8080/products/${productId}`, //url 수정
      option
    ).then((response) => response.json());

    displayProduct(data); // 상품 정보를 화면에 표시하는 함수 호출
  }

  // 상품 정보를 화면에 표시하는 함수
  function displayProduct(product) {
    const cartWrap = document.querySelector("#cart_wrap");
    cartWrap.innerHTML = `
      <div class="left">
        <img src="${product.data.productImage}" alt="img" />
      </div>
      <div class="right">
        <div class="top">
          <h1 id="productTitle">${product.data.name}</h1>
          <p id="productCategory">${product.data.category}</p>
          <dl>
            <dt>판매가격</dt>
            <dd class="price" id="productPrice">${product.data.price.toLocaleString()} 원</dd>
          </dl>
          <div class="number">
            <p class="ordername" id="productOrderName">수량</p>
            <div class="ordernumber">
              <input type="number" name="num" id="num" min="1" max="5" value="1"/>
              <span class="num_price" id="productNumPrice">${product.data.price.toLocaleString()} 원</span>
            </div>
          </div>
          <div class="totalprice">
            <p>총 상품 금액</p>
            <p class="result_price" id="totalPrice">${product.data.price.toLocaleString()} 원</p>
          </div>
        </div>
        <div class="bottom">
          <button type="button" id="orderBtn">등록하기</button>
          <button type="button" id="cartBtn">장바구니</button>
        </div>
      </div>`;

    // 수량 입력란에 이벤트 리스너 등록
    document.getElementById("num").addEventListener("input", updateTotalPrice);
    document.getElementById("orderBtn").addEventListener("click", placeOrder);
  }

  // 총 상품 금액 초기값 설정
  let totalAmount = 0;

  // 수량 변경에 따라 총 상품 금액을 업데이트하는 함수
  function UpdateTotalPrice() {
    const numInput = document.getElementById("num");
    const productPrice = parseFloat(
      document
        .getElementById("productPrice")
        .innerText.replace(" 원", "")
        .replace(",", "")
    );
    const numSelected = parseInt(numInput.value);

    if (!isNaN(numSelected) && numSelected >= 1) {
      totalAmount = productPrice * numSelected;
      const totalPriceElement = document.getElementById("totalPrice");
      totalPriceElement.textContent = `${totalAmount.toLocaleString()} 원`;
    }
  }

  // 등록하기 버튼 클릭 시 주문 처리 함수


  //사장님 버튼 생성
  const showBtn = async () => {
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
        $(".productBtn").empty();
        if (res.data.isOwner) {
          const btnName = document.createElement("div");
          btnName.innerHTML = `<button id="productUpdateBtn" onclick="openProductModal()">수정/삭제</button>`;
          document.querySelector(".productBtn").appendChild(btnName);
        }
      });
  };

  

  // 초기에 getProduct 함수 호출
  getProduct(productid);
  showBtn();
})();

const updateProduct = async () => {
  const name = document.getElementById("editProductName").value,
    price = document.getElementById("editProductImg").value,
    category = document.getElementById("editProductCategory").value,
    productImage = document.getElementById("editProductImg").value,
    password = document.getElementById("editProductPassword").value,
    urlParams = new URL(location.href).searchParams,
    productId = urlParams.get("id");
  const req = {
    name,
    price,
    category,
    productImage,
    password,
  };
  await fetch(`http://localhost:8080/products/${productId}`, {
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
      if (res.errorMessage) {
        alert(res.errorMessage);
      } else {
        alert(res.message);
        window.location.reload();
      }
    })
    .catch((err) => {
      console.error("상품수정 중 에러 발생");
    });
};
const deleteProduct = async () => {
const password = document.getElementById("editProductPassword").value,
      urlParams = new URL(location.href).searchParams,
      productId = urlParams.get("id");
  const req = {
    password,
  };
  await fetch(`http://localhost:8080/products/${productId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.errorMessage) {
        alert(res.errorMessage);
      } else {
        alert(res.message);
        window.location.reload();
      }
    })
    .catch((err) => {
      console.error("상품삭제 중 에러 발생");
    });
  }

