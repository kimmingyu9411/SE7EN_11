const orderBtn = document.getElementById("orderBtn");
const reviewBtn = document.getElementById("reviewBtn");
const orderModal = document.getElementById("myModal");
const reviewModal = document.getElementById("reviewModal");
const closeBtns = document.getElementsByClassName("close");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const submitReviewBtn = document.getElementById("submitReviewBtn");

reviewBtn.style.display = "none";

orderBtn.addEventListener("click", () => {
  orderModal.style.display = "block";
});

reviewBtn.addEventListener("click", () => {
  reviewModal.style.display = "block";
});

for (const closeBtn of closeBtns) {
  closeBtn.addEventListener("click", () => {
    orderModal.style.display = "none";
    reviewModal.style.display = "none";
  });
}

window.addEventListener("click", (event) => {
  if (event.target === orderModal) {
    orderModal.style.display = "none";
  }
  if (event.target === reviewModal) {
    reviewModal.style.display = "none";
  }
});

confirmOrderBtn.addEventListener("click", () => {
  orderModal.style.display = "none";
  alert("주문이 완료되었습니다!");
  orderBtn.style.display = "none";
  reviewBtn.style.display = "block";
});

submitReviewBtn.addEventListener("click", () => {
  reviewModal.style.display = "none";
  alert("리뷰를 작성했습니다!");
});
