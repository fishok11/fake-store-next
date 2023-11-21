import ProductCard from "@/components/ProductCard/ProductCard"
import SideBar from "@/components/SideBar/SideBar"
import { Product, Products } from "@/types"
import axios from "axios"

export const getProducts = async() => {
  try {
    const { data }: { data: Products | undefined } = await axios.get('https://fakestoreapi.com/products');

    return data
  } catch(error) {
    console.log(error);
  }
}

const getCategories = async() => {
  try {
    const { data }: { data: string[] | undefined } = await axios.get('https://fakestoreapi.com/products/categories')
    
    return data;
  } catch(error) {
    console.log(error);
  }
}

export default async function Home() {
  const products: Products | undefined = await getProducts()
  const categories: string[] | undefined = await getCategories()

  if (products === undefined || categories === undefined) {
    return (
      <p>
        Loading...
      </p>
    )
  }

  return (
    <div className={'container'}>
      <SideBar categories={categories} />
      <div className={'productsContainer'}>
        {products.map((product: Product) => (
            <ProductCard 
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            key={product.id}
          />
        ))}
      </div>
    </div>
  )
}
