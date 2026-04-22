import { getCart } from "./cart.js";
export function renderCart(list, totalEl, renderItem) {
    const items = getCart();

    // EMPTY STATE
    if (items.length === 0) {
        list.innerHTML = "<p>Your cart is empty 🧁</p>";

        if (totalEl) {
            totalEl.textContent = "";
            totalEl.style.display = "none";
        }

        return;
    }

    // SHOW TOTAL BOX AGAIN
    if (totalEl) {
        totalEl.style.display = "flex";
    }

    // RENDER ITEMS
    list.innerHTML = "";

    let total = 0;

    items.forEach((item, index) => {
        total += item.price * item.qty;

        const el = renderItem(item, index);
        list.appendChild(el);
    });

    // UPDATE TOTAL
    if (totalEl) {
        totalEl.textContent = `Total: $${total}`;
    }
}