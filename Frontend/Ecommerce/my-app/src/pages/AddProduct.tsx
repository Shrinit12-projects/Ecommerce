import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert("All fields are required");
      return;
    }

    await axios.post("http://localhost:5000/api/products", { name, price: Number(price), description });
    alert("Product added successfully");
    navigate("/");
  };

  return (
    <div className="p-5 bg-yellow-100">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-2"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mb-2"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border p-2 mb-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
