import styles from "./CurrentImgTrackers.module.scss";

function CurrentImgTrackers({product, imgIndex}) {
    return (
        <div className={styles.trackWrapper}>
            {product.variants.map((item, index) => {
                if(imgIndex === index) {
                    return (<p>O</p>)
                }
                return (<p>o</p>)
            })}
        </div>
    )   
}

export default CurrentImgTrackers;