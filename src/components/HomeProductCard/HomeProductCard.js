import Image from "next/image";
import Link from "next/link";
import CurrentImgTrackers from "@components/CurrentImgTrackers";
import { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import styles from "./HomeProductCard.module.scss";

function HomeProductCard({ product }) {
  const { groupId, variants, groupTitle } = product;
  const [imgIndex, setImgIndex] = useState(0);

  function showRightImg(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (imgIndex === product.variants.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex((prev) => prev + 1);
    }
  }

  function showLeftImg(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (imgIndex === 0) {
      setImgIndex(product.variants.length - 1);
    } else {
      setImgIndex((prev) => prev - 1);
    }
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
              priority={true}
            />
            {product.variants.length > 1 && (
              <>
                <FaArrowCircleRight
                  id={groupId}
                  className={`${styles.arrow} ${styles.right}`}
                  onClick={(e) => showRightImg(e, groupId)}
                />
                <FaArrowCircleLeft
                  id={groupId}
                  className={`${styles.arrow} ${styles.left}`}
                  onClick={(e) => showLeftImg(e, groupId)}
                />
              </>
            )}
            {product.variants.length > 1 && (
              <CurrentImgTrackers product={product} imgIndex={imgIndex} />
            )}
          </div>
          <h3 className={styles.productTitle}>{groupTitle}</h3>
        </a>
      </Link>
    </li>
  );
}

export default HomeProductCard;
