window.addEventListener("DOMContentLoaded", getProduct(1));
// 상품 정보를 서버로부터 가져오는 함수
async function getProduct(productId) {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const data = await fetch(`http://localhost:8080/products/${productId}`,option)
    .then((d) => d.json());
    
    console.log(data);
}

// 상품 정보를 화면에 표시하는 함수
function displayProduct(product) {
  const cartWrap = document.querySelector(".cart_wrap");
  console.log(cartWrap);
  cartWrap.innerHTML = ` <div class="left">
  <img src="./img/과자.png" alt="img" />
</div>
<div class="right">
  <div class="top">
    <h1 id="productTitle">${product.name}</h1>
    <p id="productCategory">${product.category}</p>
    <dl>
      <dt>판매가격</dt>
      <dd class="price" id="productPrice">${product.price} 원</dd>
    </dl>
    <div class="number">
      <p class="ordername" id="productOrderName"></p>
      <div class="ordernumber">
        <input type="number" name="num" id="num" />
        <span class="num_price" id="productNumPrice">${product.price} 원</span>
      </div>
    </div>
    <div class="totalprice">
      <p>총 상품 금액</p>
      <p class="result_price" id="totalPrice">1,000 원</p>
    </div>
  </div>
  <div class="bottom">
    <button type="button" id="orderBtn">주문하기</button>
    <button type="button" id="cartBtn">장바구니</button>
  </div>
</div>`;
}