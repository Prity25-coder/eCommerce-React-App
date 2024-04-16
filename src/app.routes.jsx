import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "./Layouts";
import { ErrorPage, CartTwo } from "./components";
import { productRoutes } from "./features/product";

const appRoutes = createBrowserRouter([
  // Product related routes
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [...productRoutes],
  },

  // Cart related routes
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "cart",
        element: <CartTwo />,
      },
      // { // remove and add into order route
      //   path: 'orders',
      //   element: ,
      // }
    ],
  },
]);

export default appRoutes;
