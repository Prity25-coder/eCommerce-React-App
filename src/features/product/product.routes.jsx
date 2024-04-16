import { AddProduct, ProductDetails, Products } from "../../components";

const productRoutes = [
  {
    path: "",
    element: <Products />,
  },
  {
    path: "products/:productId",
    element: <ProductDetails />,
  },
  {
    path: "add-product",
    element: <AddProduct />,
  },
];

export default productRoutes;
