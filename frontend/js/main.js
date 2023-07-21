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
      temp.innerHTML = `<li>
                      <div><img src="./img/세븐일레븐일러스트.png" /></div>
                      <a href="#">${storeAddress}</a>
                      </li>`;
      document.querySelector(".zonelist").append(temp);
    });
  });
};
