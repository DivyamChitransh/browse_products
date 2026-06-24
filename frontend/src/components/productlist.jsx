import ProductCard from "./productCard";

function ProductList({ products }) {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;