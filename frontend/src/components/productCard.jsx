function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>

      <p>
        Category: {product.category}
      </p>

      <p>
        ₹{product.price}
      </p>
    </div>
  );
}

export default ProductCard;