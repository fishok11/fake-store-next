export type Product = {
  id: string;
  title: string;
  price: number;
  category: string; 
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
};

export type Products = Product[];

//=======================================================================

export type User = {
  id: number | null;
  email: string;
  username: string;
  password: string;
}

export type UserSignUp = {
  email: string;
  username: string;
  password: string;
}

//=======================================================================

export type ProductInCart = {
  productId: number;
  quantity: number;
}

export type CartItemToAdded = {
  userId: number;
  products: ProductInCart[];
};

export type CartItem = {
  id: number;
  userId: number;
  products: ProductInCart[];
}; 

export type Cart = CartItem[];

//=======================================================================