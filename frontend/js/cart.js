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
    console.log(product);
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
            <dd class="price" id="productPrice">${product.data.price} 원</dd>
          </dl>
          <div class="number">
            <p class="ordername" id="productOrderName">수량</p>
            <div class="ordernumber">
              <input type="number" name="num" id="num" min="1" max="5" value="1" onchange="changePrice()" />
              <span class="num_price" id="productNumPrice">${product.data.price.toLocaleString()} 원</span>
            </div>
          </div>
          <div class="totalprice">
            <p>총 상품 금액</p>
            <p class="result_price" id="totalPrice">${product.data.price.toLocaleString()} 원</p>
          </div>
        </div>
        <div class="bottom">
          <button type="button" id="orderBtn" onclick="updateCart()">등록하기</button>
          <button type="button" id="cartBtn">장바구니</button>
        </div>
      </div>`;
  }

  // 등록하기 버튼 클릭 시 주문 처리 함수
  updateCart = async () => {
    const quantity = Number($('#num').val());
    // console.log(document.cookie.split('; ')[0].split('=')[1]);
    const option={
      method:"POST",
      header:{
        'Content-Type':"application/json",
        credentials:"include",
        "Authorization":document.cookie.split('; ')[0].split('=')[1]
      },
      body:{
        quantity:JSON.stringify(quantity)
      }
    };

    const result = await fetch(`http://127.0.0.1:8080/cart?id=${productId}`,option).then(d=>d.json());
    console.log(result);
  };

  // 초기에 getProduct 함수 호출
  getProduct(productid);

function changePrice(){
  const price = Number(document.getElementById('productPrice').innerHTML.split(' ')[0]);
  const quantity = Number($('#num').val());
  document.getElementById('totalPrice').innerHTML=price*quantity+' 원';
}

//사장님 버튼 생성
showBtn = async () => {
  await fetch("http://localhost:8080/users/me", {
    method: "GET",

    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      $(".productBtn").empty();
      if (res.data.isOwner) {
        const btnName = document.createElement("div");
        btnName.innerHTML = `<button id="productUpdateBtn" onclick="openProductModal()">수정/삭제</button>`;
        document.querySelector(".productBtn").appendChild(btnName);
      }
    });
  }
  showBtn();