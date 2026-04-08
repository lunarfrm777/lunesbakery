// returning the current cart in local storage 

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


export function addToCart(id, name, price) {
  const cart = getCart();

  // avoiding two items with same name or lol renaming item and breaking logic
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    // increasing exisitngItem by 1 if there
    existingItem.qty += 1;
  } else {
    // otherwise → add new item with id + qty
    cart.push({
      // generates unique id
      id: crypto.randomUUID(),
      name,
      price,
      // qty allows for avoiding duplications in the array of items,, and rather just updating value of key
      qty: 1
    });
  }

  saveCart(cart);
  // updates cart immediately
  updateCartCount();
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
