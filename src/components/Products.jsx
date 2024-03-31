import { useState, useEffect } from "react";

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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-7 xl:aspect-w-8">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <p className="mt-4 text-sm text-gray-700">{product.category}</p>

              <p className="mt-2 text-sm text-black">{product.title}</p>

              {/* <h3 className="mt-4 text-sm text-gray-700">
                {product.description}
              </h3> */}

              <p className="mt-1 text-lg font-medium text-yellow-500">
                Rating:- {product.rating.rate}
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
