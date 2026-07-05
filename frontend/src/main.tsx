import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import ProductScreen from "./screens/ProductScreen";
import HomeScreens from "./screens/HomeScreens";
import store from "./redux/store";
import { Toaster } from "./components/ui/sonner";
import CartScreen from "./screens/CartScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeScreens /> },
      { path: "/product/:id", element: <ProductScreen /> },
      { path: "/cart", element: <CartScreen /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
