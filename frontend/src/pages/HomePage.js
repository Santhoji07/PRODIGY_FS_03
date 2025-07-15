import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

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
      setNotify(<span style={{ background: "green", color: "white", padding: "4px 12px", borderRadius: "4px" }}>Added to cart!</span>);
      setTimeout(() => setNotify(""), 1000);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header className="shop-header">
        <div className="shop-title">Shopzy</div>
        <div className="shop-actions">
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div style={{ margin: 20 }}>
        {notify && <div className="notify">{notify}</div>}
        <div className="products-grid">
          {products.map(p => (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="price">₹{p.price}</div>
              <button onClick={() => addToCart(p._id)}>
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