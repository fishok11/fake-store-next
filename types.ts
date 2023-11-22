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
  id: string | null;
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

export type UserCartToAdded = {
  userId: string;
  products: ProductInCart[];
};

export type UserCart = {
  id: string;
  userId: string;
  products: ProductInCart[];
}; 

export type Cart = UserCart[];

//=======================================================================