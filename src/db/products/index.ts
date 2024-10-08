import { db } from "..";
import { converter } from "../../utils/converter";
import { Product } from "../../models/products";

// Get all products
export const getAllProducts = async () => {
  try {
    const products = await db.collection('products').withConverter(converter<Product>()).get();
    if (products.empty) {
      console.log("No products found.");
      return;
    }
    return products.docs.map((product) => ({ ...product.data(), id: product.id })) as Product[];
  } catch (error) {
    console.error("Error getting products:", error);
    return;
  }
};

// Create or Update a product
export const createUpdateProduct = async ({ id, ...data }: Partial<Product>) => {
  try {
    if (id) {
      await db.collection("products").doc(id).set(data, { merge: true });
    } else {
      await db.collection("products").add(data);
    }
    return { ...data, id };
  } catch (error) {
    console.error("Error create or update products:", error);
    return
  }
};

// Delete a product
export const deleteProduct = async (id: string) => {
  try {
    await db.collection('products').doc(id).delete();
    return { message: `Product ${id} deleted` };
  } catch (error) {
    console.error(error);
    return;
  }
};
