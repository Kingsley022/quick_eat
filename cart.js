document.addEventListener("DOMContentLoaded", () => {
  renderitems();
});

function renderitems() {
  const cart_items = getItems();
  const cartItems_el = document.querySelector(".cart-items");

  // Clear DOM
  cartItems_el.innerHTML = "";
  getTotal(cart_items);

  cart_items.forEach((item) => {
    const divEl = document.createElement("div");
    divEl.classList.add("cart-item");

    const innerHtml = `
            <img src="${item?.image}" alt="">
            <p class="item-name">${item?.name}</p>
            <p class="item-price">₦${item?.price}</p>
    
            <div class="quantity-container">
                <button class="subtract">-</button>
                <p class="quantity">${item?.quantity}</p>
                <button class="add">+</button>
            </div>
            <i class="fa-solid fa-xmark" id="deleteBtn"></i>
        `;

    divEl.innerHTML = innerHtml;
    const incrementBtn = divEl.querySelector(".add");
    const decrementBtn = divEl.querySelector(".subtract");
    const deleteBtn = divEl.querySelector("#deleteBtn");

    incrementBtn.addEventListener("click", () => handleIncrement(item));
    decrementBtn.addEventListener("click", () => handleDecrement(item));
    deleteBtn.addEventListener("click", () => handleDelete(item));
    cartItems_el.append(divEl);
  });
  
  console.log(getTotal());
  
}

// Delete item
function handleDelete(item) {
  const cart_items = getItems();
  const newCartItems = cart_items.filter(
    (cart_item) => cart_item.id !== item.id
  );
  localStorage.setItem("cart-items", JSON.stringify(newCartItems));
  renderitems();
}

// Item increment
function handleIncrement(item) {
  const cart_items = getItems();
  const newCartItems = cart_items.map((cart_item) => {
    if (cart_item.id == item.id) {
      return { ...cart_item, quantity: cart_item.quantity + 1 };
    } else {
      return cart_item;
    }
  });
  localStorage.setItem("cart-items", JSON.stringify(newCartItems));
  renderitems();
}

// Item increment
function handleDecrement(item) {
  const cart_items = getItems();
  const newCartItems = cart_items.map((cart_item) => {
    if (cart_item.id == item.id && cart_item.quantity > 1) {
      return { ...cart_item, quantity: cart_item.quantity - 1 };
    } else {
      return cart_item;
    }
  });
  localStorage.setItem("cart-items", JSON.stringify(newCartItems));
  renderitems();
}

// Gets items from localstorage
function getItems() {
  const cart_items = JSON.parse(localStorage.getItem("cart-items"));
  return cart_items;
}

function getTotal(items) {
  items.reduce((total, item) => {
    const newTotal = total + item.quantity * parseInt(item.price);
    console.log(newTotal);
  }, 0);
}

function getTotal() {
    const items = getItems();
    return items.reduce((total, item) => total + item.quantity * parseInt(item.price), 0);
} 