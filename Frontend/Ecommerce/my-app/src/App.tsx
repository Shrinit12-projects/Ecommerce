import { Routes, Route, Link } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/cart";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div>
      <nav className="parent_nav">
        <Link to="/" className="all-product">All Products</Link>
        <Link to="/cart"  className="all-product">Cart</Link>
        <Link to="/add-product"  className="all-product">Add Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
