function LoadMoreButton({
  loading,
  onClick,
}) {
  return (
    <button
      className="load-more-btn"
      disabled={loading}
      onClick={onClick}
    >
      {loading
        ? "Loading..."
        : "Load More"}
    </button>
  );
}

export default LoadMoreButton;