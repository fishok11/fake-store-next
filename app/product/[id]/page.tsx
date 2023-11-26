import { Product } from "@/types";
import styles from './ProductPage.module.scss';
import CounterProducts from "@/components/CounterProducts/CounterProducts";
import { getProduct, getProducts } from "@/services/requests";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('@/components/CounterProducts/CounterProducts'), { ssr: false })

type ProductProps = {
  params: {
    id: string;
  };
}

const ProductPage = async({ params: { id } }: ProductProps) => {
  const product = await getProduct(id);
  
  return (
      <div className={styles.container}>
        <div className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <img src={product?.image} alt="" className={styles.image}/>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>{product?.title}</p>
              <p className={styles.rating}>{product?.rating.rate}/{product?.rating.count}</p>
            </div>
            <NoSSR price={product?.price} id={id} />
          </div>
          <p className={styles.description}>{product?.description}</p>
        </div>
      </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts();
 
  return products?.map((product) => ({
    slug: product.id,
  }))
}

export const metadata: Metadata = {
  title: 'Product',
}

export default ProductPage;