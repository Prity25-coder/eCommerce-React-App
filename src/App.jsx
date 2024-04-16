import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import appRoutes from "./app.routes";
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoutes} />
    </Provider>
  );
}

export default App;
