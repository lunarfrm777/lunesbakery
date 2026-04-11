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


 if (!existingItem) {
    // otherwise → add new item with id + qty
    cart.push({
      // use product id rather than generating a new one on every click!! -> function called in BakeCard
      id,
      name,
      price,
      // qty allows for avoiding duplications in the array of items,, and rather just updating value of key
      qty: 1
    });
  } else {
    // increasing exisitngItem by 1 if there
    existingItem.qty += 1;
  }

  saveCart(cart);
  // updates cart immediately
  updateCartCount();
  // this allows for the cart to be updated instantly!
  window.dispatchEvent(new Event("cart-updated"));
}

// export function updateCartCount() {
//   const count = document.querySelector("#cart-count");
//   if (count) count.textContent = cart.length;
// }
export function updateCartCount() {
  const count = document.querySelector("#cart-count");
  if (!count) return;

  const cart = getCart(); // ✅ get fresh cart

  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  count.textContent = total;
}

// wanting to display the $ value with the items added to the cart
export function getCartTotal() {
  const cart = getCart();

  return cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  // window.dispatchEvent(new Event("nav-total"))
}

// the previous version assumed that there is a global [cart] variable somewhere
// there isnt anymore! and then saveCart() would use that global cart
// now not using global cart and using local storage!!!!! avoiding getting out of sync with local
// storage using old method
export function clearCart() {
  localStorage.removeItem("cart")
  updateCartCount();
  window.dispatchEvent(new Event("cart-updated"))
}

document.addEventListener("DOMContentLoaded", updateCartCount);
