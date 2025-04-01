import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, addToCart } from "../store/productSlice";
import { RootState, AppDispatch } from "../store/store";
import axios from "axios";

const AllProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  return (
    <div className="container">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => ( 
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
