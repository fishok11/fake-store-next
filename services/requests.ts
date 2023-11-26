import { Cart, Product, ProductInCart, Products, User, UserCart, UserCartToAdded, UserLogIn, UserSignUp } from "@/types";
import axios from "axios";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import db from "@/firebase"
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

export const getProducts = async() => {
  try {
    const docRef = query(collection(db, "products"));
    const docs = await getDocs(docRef);
    let data: Products = [];

    docs.forEach((doc) => {
      const product: Product = {
        id: doc.id,
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

      data.push(product)
    });

    return data;
  } catch(error) {
    toast.error('Error!');
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
    toast.error('Error!');
  }
}

export const getProductsInCategory = async(category: string) => {
  try {
    const docRef = query(collection(db, "products"), where("category", "==", category));
    const docs = await getDocs(docRef);
    let data: Product[] = [];

    docs.forEach((doc) => {
      const product: Product = {
        id: doc.id,
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

      data.push(product);
    });

    return data;
  } catch(error) {
    toast.error('Error!');
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
    } 
  } catch(error) {
    toast.error('Error!');
  }
}

export const getCategories = async() => {
  try {
    const { data }: { data: string[]} = await axios.get('https://fakestoreapi.com/products/categories');
      
    return data;
  } catch(error) {
    toast.error('Error!');
  }
}

//=======================================================================================================

export const createUserCart = async(userId: string) => {
  try {
    const cart: UserCartToAdded = {
      userId: userId,
      products: []
    }
    
    const data = await addDoc(collection(db, "carts"), cart); 
    
    return data;
  } catch(error) {
    toast.error('Error!');
  }
}

export const getUserCart = async() => {
  try {
    const cartId = getCookie('cart');

    if (cartId === undefined) return;

    const docRef = doc(db, "carts", cartId);
    const docCart= await getDoc(docRef);

    if (docCart.exists()) {
      const data: UserCart = {
        id: docCart.id,
        userId: docCart.data().userId,
        products: docCart.data().products,
      };
      
      return data;
    } 
  } catch(error) {
    toast.error('Error!');
  }
} 

export const addProductToCart = async(product: ProductInCart) => {
  try {
    const userCart = await getUserCart()

    if (userCart === undefined) return;

    const docGroup = doc(db, "carts", userCart.id);
    const data = await updateDoc(docGroup, {
      ...userCart,
      products: [product, ...userCart.products] 
    });

    toast.success('Succes!');

    return data
  } catch(error) {
    toast.error('Error!');
  }
}

//=======================================================================================================

export const createUser = async(user: UserSignUp) => {
  try {
    const userData = await addDoc(collection(db, "users"), user); 

    const cartData = await createUserCart(userData.id)

    toast.success('Succes!');

    return {
      userData,
      cartData
    };
  } catch(error) {
    toast.error('Error!');
  }
}

export const logInUser = async(user: UserLogIn) => {
  try {
    const docRefUser = query(collection(db, "users"), where("username", "==", user.username), where("password", "==", user.password));
    const docsUser = await getDocs(docRefUser);
    let userData: Partial<User> = {};

    docsUser.forEach((doc) => {
      const user: Partial<User> = {
        id: doc.id,
        username: doc.data().username,
        password: doc.data().password,
      };

      userData = user;
    });

    const docRefCart = query(collection(db, "carts"), where("userId", "==", userData.id));
    const docsCart = await getDocs(docRefCart);
    let cartId: string = '';

    docsCart.forEach((doc) => {
      cartId = doc.id;
    });

    toast.success('Succes!');

    return {
      userData,
      cartId
    };
  } catch(error) {
    toast.error('Error!');
  }
}

export const getUser = async() => {
  try {
    const userId = getCookie('user');

    if (userId === undefined) return;

    const docRef = doc(db, "users", userId);
    const docUser = await getDoc(docRef);

    if (docUser.exists()) {
      const data: User = {
        id: docUser.id,
        username: docUser.data().username,
        password: docUser.data().password,
        email: docUser.data().email,
      };
      
      return data;
    }
  } catch(error) {
    toast.error('Error!');
  }
}