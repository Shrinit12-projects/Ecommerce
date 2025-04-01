import { Routes, Route, Link } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/cart";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";


function App() {
  return (
    <div>
      <nav className="parent_nav">
        <div className="header">
          <Link to="/" className="all-product">Fastkart</Link>
          <div className="wrapper">
            <Link to="/cart"  className="all-product"><img src="/assets/cart-shopping-svgrepo-com.svg" className="icon" alt="" /></Link>
            <Link to="/add-product"  className="all-product"><img src="/assets/add-svgrepo-com.svg" className="icon" width="15" height="15" alt="" />Add Product</Link>
          </div>
         
        </div>
       
      </nav>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
