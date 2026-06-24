function Filters({
  category,
  setCategory,
  onApply,
}) {
  return (
    <div className="filters">
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
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

      <button onClick={onApply}>
        Apply Filter
      </button>
    </div>
  );
}

export default Filters;