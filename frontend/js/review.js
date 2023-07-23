// const createReview = fetch(`http://localhost:8080/reviews?id=${productId}`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     content: "content",
//     star: "star",
//   }),
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

const urlParams = new URL(location.href).searchParams;
const productId = urlParams.get("id");

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
        <li id="${id}">
          <div class="reviewInfo">
            <p class="review_nickname">${nickname}</p>
            <p class="review_star">${star}</p>
            <p class="review_content">${content}</p>
          </div>
        </li>
      `;
  });
  reviewContainer.appendChild(reviewUl);
}
