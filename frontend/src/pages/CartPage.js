import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [notify, setNotify] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    const { data } = await axios.get("http://localhost:5000/api/cart", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setCart(data);
  };

  const updateQuantity = async (productId, quantity) => {
    await axios.post("http://localhost:5000/api/cart/update", { productId, quantity }, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await axios.post("http://localhost:5000/api/cart/remove", { productId }, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    fetchCart();
  };

  const handlePurchase = async () => {
    await axios.post("http://localhost:5000/api/cart/purchase", {}, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setNotify("Products purchased!");
    setTimeout(() => {
      setNotify("");
      navigate("/home");
    }, 1000);
  };

  const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div>
      <header style={{
        background: "#333",
        color: "#fff",
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ fontWeight: "bold", fontSize: 24 }}>Shopzy</div>
        <button onClick={() => navigate("/home")} style={{ color: "#fff" }}>Back to Home</button>
      </header>
      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        {notify && <div style={{ color: "green", marginBottom: 10 }}>{notify}</div>}
        <h2>Your Cart</h2>
        {cart.items.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Net</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.productId._id}>
                  <td>
                    <img src={item.productId.image} alt={item.productId.name} width="50" />
                    <div>{item.productId.name}</div>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      style={{ width: 50 }}
                      onChange={e => updateQuantity(item.productId._id, Number(e.target.value))}
                    />
                  </td>
                  <td>₹{item.productId.price}</td>
                  <td>₹{item.productId.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.productId._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h3>Total: ₹{total}</h3>
        {cart.items.length > 0 && (
          <button onClick={handlePurchase} style={{ marginTop: 10 }}>
            Proceed to Purchase
          </button>
        )}
      </div>
    </div>
  );
}

export default CartPage;