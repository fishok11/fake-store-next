import Loading from '@/app/loading';
import styles from './ProductPage.module.scss';
import { getProduct } from "@/services/requests";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from 'next/image'

const NoSSR = dynamic(() => import('@/components/CounterProducts/CounterProducts'), { ssr: false })

type ProductProps = {
  params: {
    id: string;
  };
}

const ProductPage = async({ params: { id } }: ProductProps) => {
  const product = await getProduct(id);

  if (!product) {
    return (
      <Loading />
    )
  }
  
  return (
      <div className={styles.container}>
        <div className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <Image src={product.image} alt={product.title} className={styles.image} width={320} height={424}/>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>{product.title}</p>
              <p className={styles.rating}>{product.rating.rate}/{product.rating.count}</p>
            </div>
            <NoSSR price={product.price} id={id} />
          </div>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
  )
}

export const metadata: Metadata = {
  title: 'Product',
}

export default ProductPage;