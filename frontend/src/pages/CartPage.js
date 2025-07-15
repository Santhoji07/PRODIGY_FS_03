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
        <button
          style={{
            background: "#eee",
            color: "#555",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </header>
      <div className="cart-container">
        {notify && <div style={{ color: "green", marginBottom: 10 }}>{notify}</div>}
        <h2 className="cart-title">Your Cart</h2>
        {cart.items.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <table className="cart-table">
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
                    <div className="cart-product-name">
                      <img
                        className="cart-product-img"
                        src={item.productId.image}
                        alt={item.productId.name}
                      />
                      {item.productId.name}
                    </div>
                  </td>
                  <td>
                    <input
                      className="cart-input"
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={e => updateQuantity(item.productId._id, Number(e.target.value))}
                    />
                  </td>
                  <td className="cart-price">₹{item.productId.price}</td>
                  <td className="cart-net">₹{item.productId.price * item.quantity}</td>
                  <td>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.productId._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-total">Total: ₹{total}</div>
        {cart.items.length > 0 && (
          <button className="cart-purchase-btn" onClick={handlePurchase}>
            Proceed to Purchase
          </button>
        )}
      </div>
    </div>
  );
}

export default CartPage;