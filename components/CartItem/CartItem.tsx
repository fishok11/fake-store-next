import { getProduct } from "@/services/requests";
import styles from "@/components/CartItem/CartItem.module.scss"
import Image from 'next/image'
import Loading from "@/app/loading";

const CartItem = async({ id }: { id: string}) => {
  const product = await getProduct(id);

  if (!product) {
    return (
      <Loading />
    )
  }

  return (
    <div className={styles.cartItemContainer}>
      <div>
        <Image src={product?.image} alt={product?.image} className={styles.image} width={128} height={128}/> 
      </div>
      <div>
        <p className={styles.title}>{product?.title}</p>
        <p className={styles.price}>$ {product?.price}</p>
      </div>
    </div>     
  )
};

export default CartItem;