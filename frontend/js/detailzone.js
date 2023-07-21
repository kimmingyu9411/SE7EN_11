const urlParams = new URL(location.href).searchParams;
const storeId = urlParams.get("id");
const category = urlParams.get("category");

const getCategory = fetch(
  `http://localhost:8080/products?category=${category}&id=${storeId}/`
)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
const getCategorylist = () => {
  getCategory.then((datas) => {
    $(".products").empty();
    datas.data.forEach((category) => {
      const temp = document.createElement("ul");
      const name = category.name;
      const productId=category.id
      const productImage=category.productImage
      temp.innerHTML = `<li class="product">
                        <div id=${productId}>
                        <div class="productimg">
                        <img src="${productImage}"/>
                        </div>
                        <li>${name}</li>
                        </div>
                        </li>`;
      document.querySelector(".products").append(temp);
    });
  });
};
getCategorylist();