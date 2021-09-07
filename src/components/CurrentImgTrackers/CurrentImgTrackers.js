import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";
import styles from "./CurrentImgTrackers.module.scss";

function CurrentImgTrackers({product, imgIndex}) {
    return (
        <div className={styles.trackWrapper}>
            {product.variants.map((item, index) => {
                if(imgIndex === index) {
                    return (<RiCheckboxBlankCircleFill key={index}/>)
                }
                return (<RiCheckboxBlankCircleLine key={index}/>)
            })}
        </div>
    )   
}

export default CurrentImgTrackers;