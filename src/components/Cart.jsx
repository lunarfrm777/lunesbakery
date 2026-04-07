import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function increase(index) {
    setCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decrease(index) {
    setCart(prev =>
      prev
        .map((item, i) =>
          i === index ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  }

  function remove(index) {
    setCart(prev => prev.filter((_, i) => i !== index));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return <p>Your cart is empty 🧁</p>;
  }

  return (
    <div>
      <ul>
        {cart.map((item, index) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.qty}

            <button onClick={() => decrease(index)}>-</button>
            <button onClick={() => increase(index)}>+</button>
            <button onClick={() => remove(index)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>
    </div>
  );
}
