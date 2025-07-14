import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [notify, setNotify] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then(res => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setNotify("Added to cart!");
      setTimeout(() => setNotify(""), 1000);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        <div>
          <button onClick={() => navigate("/cart")} style={{ marginRight: 10 }}>Cart</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div style={{ margin: 20 }}>
        {notify && <div style={{ color: "green", marginBottom: 10 }}>{notify}</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {products.map(p => (
            <div key={p._id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, width: 200 }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: 100, objectFit: "cover" }} />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p><b>₹{p.price}</b></p>
              <button onClick={() => addToCart(p._id)} style={{ width: "100%" }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;