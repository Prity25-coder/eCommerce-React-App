import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "./Layouts";
import { AddProduct, ErrorPage, ProductDetails, Products } from "./components";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: 'add-product',
        element: <AddProduct />,
      }, 
      // {
      //   path: 'cart',
      //   element: ,
      // },
      // {
      //   path: 'orders',
      //   element: ,
      // }
    ]
  },
]);


export default appRoutes;