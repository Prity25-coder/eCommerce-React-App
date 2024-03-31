import { useState, useEffect } from "react";
import Product from "./Product";

const URI = "http://localhost:3000/products";

function Products() {
  const [products, setProducts] = useState([]);

  // fetch product function
  const getProducts = async () => {
    try {
      const response = await fetch(URI);
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
        <h2 className="py-3 text-2xl font-semibold">Products</h2>
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
          {products.map((product) => (
            <Product key={product.id} productInfo={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
