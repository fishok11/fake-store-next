import { Product, Products } from "@/types";
import axios from "axios";

export const getProducts = async() => {
  try {
    const { data }: { data: Products } = await axios.get('http://localhost:3002/products');

    return data
  } catch(error) {
    console.log(error);
  }
}

export const getProductsBySearch = async(search: string) => {
  try {
    const { data }: { data: Products | undefined } = await axios.get(`http://localhost:3002/products?q=${search}`);

    return data
  } catch(error) {
    console.log(error);
  }
}

export const getProductsInCategory = async(category: string) => {
  try {
    const { data }: { data: Products | undefined } = await axios.get(`http://localhost:3002/products?category=${category}`);

    return data
  } catch(error) {
    console.log(error);
  }
}

export const getCategories = async() => {
  try {
    const { data }: { data: string[] | undefined } = await axios.get('http://localhost:3002/categories')
    
    return data;
  } catch(error) {
    console.log(error);
  }
}

export const getProduct = async(id: number) => {
  try {
    const { data }: { data: Product | undefined } = await axios.get(`https://fakestoreapi.com/products/${id}`);

    return data
  } catch(error) {
    console.log(error);
  }
}