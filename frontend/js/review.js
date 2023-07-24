const url = new URL(location.href).searchParams;
const productId = url.get("id");
getProduct(productId);

async function getProduct(productId) {
  const option = {
    method: "GET",
    header: {
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(
    `http://localhost:8080/products/${productId}`,
    option
  ).then((d) => d.json());

  const reviews = data.data.Reviews;
  console.log("reviews=>", reviews);

  const reviewContainer = document.getElementById("review-list");
  const reviewUl = document.createElement("ul");

  reviews.forEach((review) => {
    const { content, star, nickname, id } = review;

    reviewUl.innerHTML += `
    <div class="reviewInfo">
    <li id="${id}">
      <strong class="review_nickname">${nickname}</strong>
      <p class="review_star">${star}</p>
      <div class="review_content"><p>${content}</p></div>
    </li>
  </div>
      `;
  });
  reviewContainer.append(reviewUl);
}

const reviewBox = {};

async function postreview(productId, content, star) {
  reviewBox.content = content;
  reviewBox.star = star;

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewBox),
  };

  try {
    const response = await fetch(
      `http://localhost:8080/reviews?id=${productId}`,
      option
    );
    const data = await response.json();
  } catch (error) {
    console.error("리뷰를 게시하는 도중 오류가 발생했습니다:", error);
  }
}