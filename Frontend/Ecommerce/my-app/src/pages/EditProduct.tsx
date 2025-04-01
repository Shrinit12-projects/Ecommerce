import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "", 
    imageUrl: product?.imageUrl || "",
  });

  console.log("Product data:", formData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedImage(file);

        // Show the selected image as a preview
        setFormData((prev) => ({
            ...prev,
            imageUrl: URL.createObjectURL(file), // Temporary preview
        }));
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: Record<string, any> = {};

    // Only include fields that have changed
    if (formData.name !== product.name) updatedFields.name = formData.name;
    if (formData.price !== product.price) updatedFields.price = formData.price;
    if (formData.description !== product.description) updatedFields.description = formData.description;

    try {
        if (selectedImage) {
            console.log("selected image:" , selectedImage)
            // ✅ Create FormData and add only changed fields + new image
            const updatedProduct = new FormData();
            // Object.keys(updatedFields).forEach((key) => {
            //     updatedProduct.append(key, updatedFields[key]);
            // });
            updatedProduct.append("name", formData.name);
            updatedProduct.append("price", formData.price);
            updatedProduct.append("description", formData.description);
            updatedProduct.append("image", selectedImage); // Add new image
            console.log("Updated fields:", updatedProduct);

            console.log("🔄 Sending updated product with new image:", updatedProduct);

            await axios.put(`http://localhost:5001/api/products/${product.id}`, updatedProduct, {
                headers: { "Content-Type": "multipart/form-data" },
            });

        } else if (Object.keys(updatedFields).length > 0) {
            // ✅ If no new image, send only updated fields as JSON
            console.log("🔄 Sending updated product without image:", updatedFields);

            await axios.put(`http://localhost:5001/api/products/${product.id}`, updatedFields, {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            console.log("ℹ No changes detected. Skipping API call.");
        }

        navigate("/");
    } catch (error) {
        console.error("❌ Failed to update product", error);
    }
};

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Current Image:</label>
        {formData.imageUrl && <img src={formData.imageUrl} alt="Product" className="image-preview" />}

        <label>Upload New Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" className="add-products-button">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
