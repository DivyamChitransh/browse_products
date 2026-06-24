import { useState } from "react";
import { createProduct } from "../api/product";

function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await createProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
      });

      if (response.success) {
        setFormData({
          name: "",
          category: "",
          price: "",
        });

        onProductAdded?.();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">
          Select Category
        </option>

        <option value="electronics">
          Electronics
        </option>

        <option value="fashion">
          Fashion
        </option>

        <option value="books">
          Books
        </option>

        <option value="sports">
          Sports
        </option>

        <option value="home">
          Home
        </option>

        <option value="beauty">
          Beauty
        </option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Adding..."
          : "Add Product"}
      </button>
    </form>
  );
}

export default AddProductForm;