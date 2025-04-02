import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, addToCart } from "../store/productSlice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

const AllProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products) as Product[];
  const cart = useSelector((state: RootState) => state.products.cart) as { id: string; name: string; price: number; description: string; imageUrl: string }[];
  useEffect(() => {
    axios.get("http://localhost:5001/api/products").then((response) => {
      dispatch(setProducts(response.data));
    });
    console.log("ddddddddd");
  }, [dispatch]);
  console.log(cart,'kokok');
  function checkCart(productId:any) {
    return cart.some(item => item.id === productId) ? "Added" : "Add to Cart";
}
  return (
    <div className="container">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-wrapper">
              <div>
                <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`, { state: product })}>
                    <img src="..\public\assets\edit-3-svgrepo-com.svg" alt="Edit" className="icon" />
                </button>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                ) : (
                  <div className="no-image">No Image</div>
                )}              
                <h3 className="product_name">{product.name}</h3>
                <p className= "product_description">{product.description}</p>
                <p className="product_price">${product.price}</p>
              </div>
              <button onClick={() => dispatch(addToCart(product))} className="cart-icon">{checkCart(product.id)}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
