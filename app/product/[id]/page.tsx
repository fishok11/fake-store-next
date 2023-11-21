import axios from "axios";
import { Product } from "@/types";
import styles from './ProductPage.module.scss';
import CounterProducts from "@/components/CounterProducts/CounterProducts";

export const getProducts = async(id: number) => {
  try {
    const { data }: { data: Product | undefined } = await axios.get(`https://fakestoreapi.com/products/${id}`);

    return data
  } catch(error) {
    console.log(error);
  }
}

type ProductProps = {
  params: {
    id: number;
  };
}

const Product = async({ params: { id } }: ProductProps) => {
  console.log(id);
  
  const product: Product | undefined = await getProducts(id)

  if (product === undefined) {
    return (
      <p>
        Loading...
      </p>
    )
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