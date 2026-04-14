import { getCart } from "./cart.js";

export function renderCart(list, totalEl, renderItem) {
    const items = getCart();

    if (items.length === 0) {
        list.innerHTML = "<p>Your cart is empty 🧁</p>";
        if (totalEl) totalEl.textContent = "";
        return;
    }

    list.innerHTML = "";

    let total = 0;

    items.forEach((item, index) => {
        total += item.price * item.qty;

        const el = renderItem(item, index);
        list.appendChild(el);
    });

    if (totalEl) {
        totalEl.textContent = `Total: $${total}`;
    }
}