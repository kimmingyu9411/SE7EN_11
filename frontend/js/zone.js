const urlParams = new URL(location.href).searchParams;
const storeId = urlParams.get("id");

function zoneCategory() {
    const temp = document.createElement("ul");
    temp.innerHTML = `
    <li class="product">
      <div id="delivery">
      <div class="deliveryimg">
        <img src="./img/배달이미지.png" />
      </div>
      </div>
    </li>
    <li class="product">
      <strong>전체보기</strong>
      <div class="logoimg">
        <img src="./img/로고.png" />
      </div>
    </li>
    <li class="product">
      <div id="sneck" onclick ="location.href='detailzone.html?category=과자&id=${storeId}'">
      <strong>과자</strong>
      <div class="sneckimg">
        <img src="./img/과자.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="beverage" onclick ="location.href='detailzone.html?category=음료&id=${storeId}'">
      <strong>음료</strong>
      <div class="beverageimg">
        <img src="./img/음료.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="item" onclick ="location.href='detailzone.html?category=생필품&id=${storeId}'">
      <strong>생필품</strong>
      <div class="itemimg">
        <img src="./img/생필품.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="lunchBox" onclick ="location.href='detailzone.html?category=도시락&id=${storeId}'">
      <strong>도시락</strong>
      <div class="lunchBoximg">
        <img src="./img/도시락.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="medical" onclick ="location.href='detailzone.html?category=의약품&id=${storeId}'">
      <strong>의약품</strong>
      <div class="medicalimg">
        <img src="./img/의약품.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="ramen" onclick ="location.href='detailzone.html?category=라면&id=${storeId}'">
      <strong>라면</strong>
      <div class="ramenimg">
        <img src="./img/라면.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="sandwich" onclick ="location.href='detailzone.html?category=샌드위치&id=${storeId}'">
      <strong>샌드위치</strong>
      <div class="sandwichimg">
        <img src="./img/샌드위치.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="braad" onclick ="location.href='detailzone.html?category=빵&id=${storeId}'">
      <strong>빵</strong>
      <div class="braadimg">
        <img src="./img/빵.png" />
      </div>
    </li>
    <li class="product">
      <div id="ice" onclick ="location.href='detailzone.html?category=빙과류&id=${storeId}'">
      <strong>빙과류</strong>
      <div class="iceimg">
        <img src="./img/빙과류.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="drink" onclick ="location.href='detailzone.html?category=주류&id=${storeId}'">
      <strong>주류</strong>
      <div class="drinkimg">
        <img src="./img/주류.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="iceProduct" onclick ="location.href='detailzone.html?category=냉동식품&id=${storeId}'">
      <strong>냉동식품</strong>
      <div class="iceProductimg">
        <img src="./img/냉동식품.png" />
      </div>
    </div>
    </li>
    <li class="product">
      <div id="cignature" onclick ="location.href='detailzone.html?category=시그니처&id=${storeId}'">
      <strong>시그니처</strong>
      <div class="cignatureimg">
        <img src="./img/편마카세.png" />
      </div>
    </div>
    </li>
  `;
    document.querySelector(".products").append(temp);
  };
  zoneCategory()

