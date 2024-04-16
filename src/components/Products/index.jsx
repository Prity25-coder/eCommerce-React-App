import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Product from "./Product";
import { config } from "../../config";
import { getProducts } from "../../Thunk/Product/productThunk";
import { productSelector } from "../../reducers/products/productsSlice";

const { apiUrl } = config;

function Products() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(productSelector);

  useEffect(() => {
    dispatch(getProducts({ url: `${apiUrl}/products` }));
  }, [dispatch]);

  // Add Product
  // Search Product
  // Delete Product

  if (loading) return <p>Loading...</p>;

  if (error) return <p>API is not working: {error}</p>;

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
