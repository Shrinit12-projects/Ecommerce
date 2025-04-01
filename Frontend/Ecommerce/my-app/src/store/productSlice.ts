import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string; // URL of the product image
}

interface CartState {
  products: Product[];
  cart: Product[];
}

const initialState: CartState = {
  products: [],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (!exists) state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setProducts, addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
