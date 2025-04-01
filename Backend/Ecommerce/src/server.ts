import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import { Product } from "./entities/product";
import { Repository } from "typeorm";

const app: Application = express(); // Ensure correct Express type
app.use(cors());
app.use(express.json());

const productRepo: Repository<Product> = AppDataSource.getRepository(Product);

// Add New Product
app.post("/api/products", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, description } = req.body;
    const product = productRepo.create({ name, price, description });
    await productRepo.save(product);
    res.json(product); // No need to return `res.json(...)`
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
app.put("/api/products/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name, price, description } = req.body;
    const product = await productRepo.findOneBy({ id });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    product.name = name;
    product.price = price;
    product.description = description;
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
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
