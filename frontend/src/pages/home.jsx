import { useEffect, useState } from "react";
import { getProducts } from "../api/product";

import Filters from "../components/filter"
import ProductList from "../components/productlist"
import LoadMoreButton from "../components/Loadmorebutton"
import AddProductForm from "../components/AddProduct"

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (cursor = null,append = false,selectedCategory = category) => {
    try {
      setLoading(true);
      const data = await getProducts({category: selectedCategory,cursor});
      if (append) { 
        setProducts((prev) => [
          ...prev,
          ...data.data,
        ]);
      } else {
        setProducts(data.data);
      }

      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadProducts = async () => {
    await fetchProducts();
  };

  loadProducts();
}, []);

  const handleApplyFilter = () => {
    fetchProducts(null, false, category);
  };

  const handleProductAdded = () => {
    fetchProducts();
  };

  return (
    <div className="container">
      <h1>Product Browser</h1>

      <AddProductForm
        onProductAdded={handleProductAdded}
      />

      <Filters
        category={category}
        setCategory={setCategory}
        onApply={handleApplyFilter}
      />

      <ProductList
        products={products}
      />

      {nextCursor && (
        <LoadMoreButton
          loading={loading}
          onClick={() =>
            fetchProducts(
              nextCursor,
              true
            )
          }
        />
      )}
    </div>
  );
}

export default Home;