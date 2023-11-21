import { Product } from "@/types";
import styles from './ProductPage.module.scss';
import CounterProducts from "@/components/CounterProducts/CounterProducts";
import { getProduct } from "@/services/requests";

type ProductProps = {
  params: {
    id: number;
  };
}

const Product = async({ params: { id } }: ProductProps) => {
  const product: Product | undefined = await getProduct(id)

  if (product === undefined) {
    return null
  }

  return (
      <div className={styles.container}>
        <div className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <img src={product.image} alt="" className={styles.image}/>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>{product.title}</p>
              <p className={styles.rating}>{product.rating.rate}/{product.rating.count}</p>
            </div>
            <CounterProducts price={product.price}/>
          </div>
          <p className={styles.description}>{product.description}</p>
        </div>
        {/* <p className={styles.container}>{state.product.category}</p> */}
      </div>
  )
}

export default Product;