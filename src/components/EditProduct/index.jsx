import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { patchProduct } from "../../Thunk/Product/productThunk";

function EditProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, error, productInfo] = useFetch(`products/${productId}`);

  useEffect(() => {
    if (productInfo) {
      const {
        title,
        image,
        price,
        rating: { rate },
        description,
      } = productInfo;

      setTitle(title);
      setImage(image);
      setPrice(price);
      setRating(rate);
      setDescription(description);
    }
  }, [productInfo]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>API is not working: {error}</p>;

  const handleEditProduct = () => {
    event.preventDefault();
    const data = {
      ...productInfo,
      title,
      image,
      price,
      rating: { rate: rating },
      description,
    };
    dispatch(patchProduct({ id: productId, data }));
    navigate("/");
  };

  return (
    <div className="py-12 md:py-24">
      <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-1">
        {/* contact from */}
        <div className="flex items-center justify-center">
          <div className="px-2 md:px-12">
            <p className="text-2xl font-bold text-gray-900 md:text-4xl">
              Update Product
            </p>

            <form
              onSubmit={handleEditProduct}
              className="mt-8 space-y-4 border-2 px-10 py-6  w-96"
            >
              <div className="grid w-full items-center gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700 "
                  htmlFor="first_name"
                >
                  Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700 "
                  htmlFor="img"
                >
                  Image
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="text"
                  id="img"
                  placeholder="Product Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <label
                  className="text-sm font-medium leading-none text-gray-700 "
                  htmlFor="text"
                >
                  Price
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="text"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <label
                  className="text-sm font-medium  text-gray-700 "
                  htmlFor="text"
                >
                  Rating
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="tel"
                  id="rating"
                  placeholder="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              <div className="grid w-full  items-center gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  id="description"
                  placeholder="Leave us a description"
                  cols={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Update Product
              </button>

              {/* cancel */}
              <Link to="/">
                <button
                  type="button"
                  className="w-full rounded-md  bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
                >
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
