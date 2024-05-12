import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { deleteProduct } from "../../../Thunk/Product/productThunk";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/Thunk/cartThunk";

const Product = ({ productInfo }) => {
  const dispatch = useDispatch();

  const { image, title, price, id } = productInfo;

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ id }));
  };

  return (
    <div className="rounded-md border">
      <img
        src={image}
        alt={`${title} img not found`}
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[350px]"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {title}
        </h1>

        {/* <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          debitis?
        </p> */}

        <div className="mt-4">
          <span className="title-font text-x font-bold text-gray-900">
            ₹ {price}
          </span>
        </div>

        <div className="mt-3 flex items-center space-x-2">
          <span className="block text-sm font-semibold">Colors : </span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
        </div>

        <div className="mt-5 flex items-center space-x-2">
          <span className="block cursor-pointer p-1 px-2 text-xs font-medium h-9 w-9">
            <Link to={`/update-product/${id}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/512/512732.png"
                alt=""
              />
            </Link>
          </span>
          <span className="block cursor-pointer p-1 px-2 text-xs font-medium h-9 w-9">
            <img
              src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
              alt=""
              onClick={handleDeleteProduct}
            />
          </span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => dispatch(addToCart(productInfo))}
        >
          Add to Cart
        </button>

        <Link to={`products/${id}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-yellow-400 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

Product.propTypes = {
  productInfo: PropTypes.object.isRequired,
};

export default Product;
