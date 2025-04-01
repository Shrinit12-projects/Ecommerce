import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import { Product } from "./entities/product";
import { Repository } from "typeorm";
import { uploadFileToMinio } from "./helper/minioConfig"; // Adjust the import path as necessary
import multer from "multer";

const app: Application = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const productRepo: Repository<Product> = AppDataSource.getRepository(Product);

// ✅ Updated: Add New Product with Image Upload
app.post("/api/products", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, description } = req.body;
    if (!req.file) {
      res.status(400).json({ error: "Image is required" });
      return;
    }

    // Upload image to MinIO
    const imageUrl = await uploadFileToMinio(req.file);

    // Save product details
    const product = productRepo.create({ name, price, description, imageUrl });
    await productRepo.save(product);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error saving product" });
  }
});

// Get All Products
app.get("/api/products", async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepo.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Get Product by ID
app.get("/api/products/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const product = await productRepo.findOneBy({ id });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// Edit Product
app.put("/api/products/:id", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name, price, description } = req.body;
    const product = await productRepo.findOneBy({ id });
    console.log("Product:", product);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    product.name = name;
    product.price = price;
    product.description = description;
    if (req.file) {
      const imageUrl = await uploadFileToMinio(req.file);
      product.imageUrl = imageUrl;
    }
    await productRepo.save(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete Product
app.delete("/api/products/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const product = await productRepo.findOneBy({ id });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    await productRepo.remove(product);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

// Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
