import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/productSlice";
import { RootState, AppDispatch } from "../store/store";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.products.cart) as { id: string; name: string; price: number; description: string; imageUrl: string }[];

  return (
    <div className="container">
      <h2>Cart</h2>
      <div className="product-grid">
        {cart.length === 0 ? <p>No items in cart</p> : null}
        {cart.map((item: { id: string; name: string; price: number; description: string; imageUrl: string }) => (
          <div key={item.id} className="product-card">
              <div className="product-wrapper">
                <div>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="product-image" />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}              
                  <h3 className="product_name">{item.name}</h3>
                  <p className= "product_description">{item.description}</p>
                  <p className="product_price">${item.price}</p>
                </div>
                <button
                  className="bg-red-500 text-white p-2 mt-2"
                  onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </div>
          </div>
      
        ))}
      </div>
    </div>
  );
};

export default Cart;
