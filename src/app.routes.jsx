import { Navigate, createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "./Layouts";
import { ErrorPage } from "./components";
import { productRoutes } from "./features/product";
import { cartRoutes } from "./features/cart";
import {orderRoutes} from "./features/order/";

const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/products" />,
  },

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
    children: [...cartRoutes],
  },

  // Order related routes
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [...orderRoutes],
  },
]);

export default appRoutes;
