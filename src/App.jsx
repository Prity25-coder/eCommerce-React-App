import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";

import appRoutes from "./app.routes";
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoutes} />


      {/* Toaster container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Provider>
  );
}

export default App;
