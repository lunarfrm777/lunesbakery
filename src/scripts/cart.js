let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// export function addToCart(name, price) {
//   cart.push({ name, price });
//   saveCart();
//   updateCartCount();
// }
//  updated addToCart to directly manipulate local storage without using the cart variable, since the cart variable is not being updated in real time and can lead to inconsistencies when multiple tabs are open or when the page is refreshed.
// export function addToCart(name, price) {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart.push({ name, price });

//   localStorage.setItem("cart", JSON.stringify(cart));
// }
export function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // if item already exists → increase qty
    existingItem.qty += 1;
  } else {
    // otherwise → add new item with id + qty
    cart.push({
      id: crypto.randomUUID(), // 🔥 unique id
      name,
      price,
      // qty allows for avoiding duplications in the array of items,, and rather just updating value of key
      qty: 1
    });
  }
}
// returning the current cart in local storage 
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function updateCartCount() {
  const count = document.querySelector("#cart-count");
  if (count) count.textContent = cart.length;
}

export function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", updateCartCount);
