import Image from "next/image";
import Link from "next/link";
import { useState } from "react"
import { FaArrowCircleRight } from "react-icons/fa";
import styles from "./HomeProductCard.module.scss";

function HomeProductCard({product}) {
    const {groupId, variants, groupTitle} = product;
    const [imgIndex, setImgIndex] = useState(0)
    function showRightImg(e, id) {
        e.preventDefault();
        e.stopPropagation();
        console.log('event target', e.target)
        console.log('id: ', id)
        setImgIndex(prev => prev + 1);
      }

    return (
        <li key={groupId} className={styles.product}>
          <Link href={`/products/${groupId}`}>
            <a>
              <div className={styles.imgWrapper}>
                <Image
                  width="4032"
                  height="3024"
                  src={variants[imgIndex].image}
                  alt={`Card of ${groupTitle}`}
                />
                <FaArrowCircleRight id={groupId} className={styles.arrow} onClick={(e) => showRightImg(e, groupId)}/>
              </div>
              <h3 className={styles.productTitle}>
                {groupTitle}
              </h3>
            </a>
          </Link>
        </li>
      );
}

export default HomeProductCard