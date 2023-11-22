import { Cart, Product, Products, User, UserCart, UserCartToAdded, UserSignUp } from "@/types";
import axios from "axios";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import db from "@/firebase"

export const getProducts = async() => {
  try {
    const docRef = query(collection(db, "products"));
    const docs = await getDocs(docRef);
    let data: Products | null = [];

    docs.forEach((doc) => {
      const product: Product = {
        id: doc.data().id,
        title: doc.data().title,
        price: doc.data().price,
        category: doc.data().category,
        description: doc.data().description,
        image: doc.data().image,
        rating: {
          rate: doc.data().rating.rate,
          count: doc.data().rating.count,
        }
      };
      product.id = doc.id
      if (data === undefined) return null
      data?.push(product)
    });

    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const getProductsBySearch = async(search: string) => {
  try {
    let data: Products | null = await getProducts();

    if (data === null) return null;

    data = data.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const getProductsInCategory = async(category: string) => {
  try {
    const docRef = query(collection(db, "products"), where("category", "==", category));
    const docs = await getDocs(docRef);
    let data: Product[] = [];

    docs.forEach((doc) => {
      const product: Product = {
        id: doc.data().id,
        title: doc.data().title,
        price: doc.data().price,
        category: doc.data().category,
        description: doc.data().description,
        image: doc.data().image,
        rating: {
          rate: doc.data().rating.rate,
          count: doc.data().rating.count,
        }
      };
      product.id = doc.id;
      if (data === undefined) return null;
      data.push(product);
    });

    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const getProduct = async(id: string) => {
  try {
    const docRef = doc(db, "products", id);
    const docProduct = await getDoc(docRef);

    if (docProduct.exists()) {
      const data: Product = {
        id: docProduct.id,
        title: docProduct.data().title,
        price: docProduct.data().price,
        category: docProduct.data().category,
        description: docProduct.data().description,
        image: docProduct.data().image,
        rating: {
          rate: docProduct.data().rating.rate,
          count: docProduct.data().rating.count,
        }
      };
      
      return data;
    } else {
      return null; 
    }
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const getCategories = async() => {
  try {
    const { data }: { data: string[]} = await axios.get('https://fakestoreapi.com/products/categories');
      
    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const createUserCart = async(userId: string) => {
  try {
    const cart: UserCartToAdded = {
      userId: userId,
      products: []
    }
    const data = await addDoc(collection(db, "carts"), cart); 
      
    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const createUser = async(user: UserSignUp) => {
  try {
    const data = await addDoc(collection(db, "users"), user); 

    createUserCart(data.id)

    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}