import CheckoutSteps from "@/components/CheckoutSteps";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearCartItem } from "@/redux/slices/cartSlice";
import { useCreateOrderMutation } from "@/redux/slices/orderApiSlice";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const PlaceOrderScreen = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.shippingAddress.user_address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress.user_address]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder().unwrap();
      dispatch(clearCartItem());
      navigate(`/order/${res.order.ID}`);
      toast.success("Add order successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center my-4">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-5xl">
        <div className="flex flex-col gap-4 w-full flex-1">
          <div>
            <h1 className="text-2xl font-medium text-gray-600">Shipping</h1>
            <div className="md:flex gap-2 my-2">
              <strong className="text-gray-600">Address:</strong>
              <p className="text-gray-500">
                {cart.shippingAddress.user_address},{cart.shippingAddress.city},
                {cart.shippingAddress.postal_code},
                {cart.shippingAddress.country}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h1 className="text-2xl font-medium text-gray-600">
              Payment Method
            </h1>
            <div className="flex gap-2 my-2">
              <strong className="text-gray-600">Method:</strong>
              <p className="text-gray-500">{cart.paymentMethod}</p>
            </div>
          </div>
          <hr />
          <div>
            <h1 className="text-2xl font-medium text-gray-600">Order Items</h1>
            {cart.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div>
                {cart.items.map((item, index) => (
                  <div key={index} className="border-b ml-4 mt-2">
                    <div className="flex gap-8 justify-between items-center py-2">
                      <div className="flex gap-4 items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-sm object-contain"
                        />
                        <Link to={`/products/${item.ID}`}>{item.name}</Link>
                      </div>
                      <div>
                        {item.quantity.toFixed(2)} x ${item.price.toFixed(2)} =
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Card className="mt-2 md:w-80 md:h-80 rounded-sm">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <hr />
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4>Items:</h4>
              <p>${cart.itemsPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <h4>Shipping:</h4>
              <p>${cart.shippingPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <h4>Tax:</h4>
              <p>${cart.taxPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <h4>Total:</h4>
              <p>${cart.totalPrice}</p>
            </div>
            <Button
              type="button"
              disabled={cart.items.length === 0 || isLoading}
              onClick={placeOrderHandler}
            >
              {isLoading ? <Loading /> : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
