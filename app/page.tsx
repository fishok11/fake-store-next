'use client'

import ProductCard from "@/components/ProductCard/ProductCard"
import SideBar from "@/components/SideBar/SideBar"
import { getCategories, getProducts } from "@/services/requests"
import { Product, Products } from "@/types"
import useSWR from "swr";

export default function Home() {
  const { data: products, isLoading } = useSWR("products", getProducts);
  const { data: categories } = useSWR("categories", getCategories);

  if (products === undefined || categories === undefined || isLoading) {
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
