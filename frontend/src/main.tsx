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
import LoginPage from "./screens/LoginScreen";
import SignupPage from "./screens/SignupScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeScreens /> },
      { path: "/product/:id", element: <ProductScreen /> },
      { path: "/cart", element: <CartScreen /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/shipping",
            element: <ShippingScreen />,
          },
          { path: "/payment", element: <PaymentScreen /> },
          { path: "/place-order", element: <PlaceOrderScreen /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/sign-up", element: <SignupPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
