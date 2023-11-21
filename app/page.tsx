'use client'

import ProductCard from "@/components/ProductCard/ProductCard"
import SideBar from "@/components/SideBar/SideBar"
import { getCategories, getProducts } from "@/services/requests"
import { Product } from "@/types"
import useSWR from "swr";
import Loading from "./loading"

const Home = () => {
  const { data: products, isLoading, error } = useSWR("products", getProducts);
  const { data: categories } = useSWR("categories", getCategories);

  if (categories === undefined) {
    return null
  }
  
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={'container'}>
      <SideBar categories={categories} />
      <div className={'productsContainer'}>
        {products?.map((product: Product) => (
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

export default Home;