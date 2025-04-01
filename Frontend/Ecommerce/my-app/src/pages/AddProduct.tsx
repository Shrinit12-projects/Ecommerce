import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // Image preview
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Set preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const uploadRes = await axios.post("http://localhost:5001/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");
      
      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setPreview(null);
      
      navigate("/");
    } catch (error) {
      alert("Error uploading image");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit" className="add-products-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
