const openEl = document.getElementById("openEl");
const closeEl = document.getElementById("closeEl");
const navEls = document.querySelector("nav");

openEl.addEventListener("click", () => {
  navEls.style.display = "flex";
  openEl.style.display = "none";
  closeEl.style.display = "block";
});

closeEl.addEventListener("click", () => {
  navEls.style.display = "none";
  openEl.style.display = "block";
  closeEl.style.display = "none";
});

// getting items
const orderBtnEls = document.querySelectorAll("#order-btn");
const cartItems = [];

orderBtnEls.forEach((orderBtn) => {
  orderBtn.addEventListener("click", () => {
    const parentEl = orderBtn.parentElement;
    const item = {
      image: parentEl.querySelector("img").src,
      price: parentEl.querySelector("#price").innerHTML.replace(/[₦,]/g, ""),
      name: parentEl.querySelector("#name").innerHTML,
      quantity: 1,
      id: Math.floor(Date.now() + Math.random()),
    };

    // cartItems.unshift(item);
    addItemTocart(item);
  });
});

function addItemTocart(item) {
  const cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
  cartItems.unshift(item);
  localStorage.setItem("cart-items", JSON.stringify(cartItems));
}
