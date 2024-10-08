import { Request, Response } from 'express';
import * as ProductDatabase from '../db/products';
import { Product } from '../models/products';


// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductDatabase.getAllProducts()
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a product
export const createProduct = async (req: Request, res: Response)=> {
  const { name, description, price, available } = req.body;

  try {
    const data: Partial<Product> = {
      name,
      description,
      price,
      available
    }

    const productRef = await ProductDatabase.createUpdateProduct(data)
    res.status(200).json({ message: 'Product created successfully', product: productRef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, available } = req.body;

  const data: Partial<Product> = {
    id,
    name,
    description,
    price,
    available
  }

  try {
    await ProductDatabase.createUpdateProduct(data)
    res.status(200).json({ message: 'Product updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await ProductDatabase.deleteProduct(id)
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
