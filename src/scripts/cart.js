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
export function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));
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
