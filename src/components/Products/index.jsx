import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Product from "./Product";
import { getProducts } from "../../Thunk/Product/productThunk";
import {
  clearSort,
  productSelector,
  sortByPrice,
} from "../../reducers/products/productsSlice";

function Products() {
  const dispatch = useDispatch();
  // const [sort, setSort] = useState();
  const { loading, error, products, isSorted } = useSelector(productSelector);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>API is not working: {error}</p>;

  const handleSortByPrice = () => {
    dispatch(sortByPrice());
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
        <h2 className="py-3 text-2xl font-semibold">Products</h2>

        {/* Sort by Price */}

        {/* <button
          type="button"
          className=" my-4 w-1/5 rounded-sm  bg-slate-200 px-2 py-1.5 text-sm font-semibold text-black "
        >
          Sort by Price
        </button> */}

        {isSorted ? (
          <button
            className=" my-4 w-1/5 flex h-10  rounded-md border border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 "
            onClick={() => dispatch(clearSort(products))}
          >
            <ul>
              <li>Low to High ✕</li>
            </ul>
          </button>
        ) : (
          <button
            className=" my-4 w-1/5 flex h-10  rounded-md border border-gray-300 bg-transparent  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 "
            onClick={handleSortByPrice}
          >
            Sort by Price
          </button>
        )}

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
