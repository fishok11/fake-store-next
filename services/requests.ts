import { Cart, Product, Products, User, UserCartToAdded, UserLogIn, UserSignUp } from "@/types";
import axios from "axios";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import db from "@/firebase"

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
    const userData = await addDoc(collection(db, "users"), user); 

    const cartData = await createUserCart(userData.id)

    return {
      userData,
      cartData
    };
  } catch(error) {
    console.log(error);
    return null; 
  }
}

export const logInUser = async(user: UserLogIn) => {
  try {
    const docRef = query(collection(db, "users"), where("username", "==", user.username), where("password", "==", user.password));
    const docs = await getDocs(docRef);
    let data: Partial<User> = {};

    docs.forEach((doc) => {
      const user: Partial<User> = {
        id: doc.id,
        username: doc.data().username,
        password: doc.data().password,
      };

      data = user;
    });

    return data;
  } catch(error) {
    console.log(error);
    return null; 
  }
}

// export const getUser = async(id: string) => {
//   try {
//     const docRef = doc(db, "users", id);
//     const docUser = await getDoc(docRef);

//     if (docUser.exists()) {
//       const data: User = {
//         id: docUser.id,
//         username: docUser.data().username,
//         password: docUser.data().password,
//         email: docUser.data().email,
//       };

//       console.log(data);
      
//       return data;
//     } else {
//       return null; 
//     }
//   } catch(error) {
//     console.log(error);
//     return null; 
//   }
// }