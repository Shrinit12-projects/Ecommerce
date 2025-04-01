import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/productSlice";
import { RootState, AppDispatch } from "../store/store";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.products.cart);

  return (
    <div className="p-5">
      <h2>Cart</h2>
      {cart.length === 0 ? <p>No items in cart</p> : null}
      {cart.map((item) => (
        <div key={item.id} className="border p-4 bg-blue-200">
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <button
            className="bg-red-500 text-white p-2 mt-2"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
