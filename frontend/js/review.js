const createReview = fetch(`http://localhost:8080/reviews?id=${productId}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    content: "content",
    star: "star",
  }),
})
  .then((response) => response.json())
  .then((json) => console.log(json));
