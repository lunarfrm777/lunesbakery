let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartCount();
}

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
