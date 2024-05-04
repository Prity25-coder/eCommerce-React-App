import { AddProduct, ProductDetails, Products } from "../../components";
import EditProduct from "../../components/EditProduct";

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
  {
    path: "update-product/:productId",
    element: <EditProduct />,
  },
];

export default productRoutes;
