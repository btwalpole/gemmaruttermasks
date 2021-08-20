import products from '@data/products.json'

export default function Product({product}) {
    return (
        <h2>Product title {product.groupTitle}</h2>
    )
}

export async function getStaticProps({ params }) {
    console.log("params", params);
    const product = products.find(({ groupId }) => groupId === params.productId);
  
    //make the product which matches the path available to the product page
    return {
      props: {
        product,
      },
    };
  }
  
  export async function getStaticPaths() {
    const paths = products.map((product) => {
      return {
        params: {
          productId: product.groupId,
        },
      };
    });
  
    return {
      paths,
      fallback: false,
    };
  }