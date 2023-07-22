const urlParams = new URL(location.href).searchParams;
const storeId = urlParams.get("id");
const category = urlParams.get("category");

const getCategory = fetch(
  `http://localhost:8080/products?category=${category}&id=${storeId}`
)
  .then((response) => response.json())
  .then((data) => {
    return data; // 데이터를 반환하여 getCategory에 저장
  })
  .then((data) => {
    // getCategory 함수 내에서 데이터 처리
    $("#category_products").empty(); // 이전 내용 초기화
    console.log(data);
    data.data.forEach((category) => {
      const name = category.name;
      const productId = category.id; // 상품 ID를 변수에 담음
      const productImage = category.productImage;
      const productCategory = category.category;
      const productPrice = category.price;

      const categoryItem = document.createElement("li");
      categoryItem.classList.add("category_product");

      const categoryDiv = document.createElement("div");
      categoryDiv.id = "catrgory_item";
      categoryDiv.onclick = function () {
        location.href = `detailProduct.html?id=${productId}`; // productId를 쿼리 매개변수로 전달
      };

      categoryDiv.innerHTML = `
        <li class="category_product">
          <div id="category_">
            <img src="${productImage}" />
            <p class="pc">${productCategory}</p>
            <p class="pn">${name}</p>
            <p class="pp">${productPrice}</p>
          </div>
        </li>
      `;

      categoryItem.appendChild(categoryDiv);
      document.querySelector("#category_products").appendChild(categoryItem);
    });
  });
