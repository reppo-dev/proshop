import { useUserOrderQuery } from "@/redux/slices/orderApiSlice";

const OrderScreen = () => {
  const { data: order, refetch, isLoading, error } = useUserOrderQuery();

  return (
    <div className="flex flex-col w-full items-center justify-center my-4">
      <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-5xl">
        <div className="flex flex-col gap-4 w-full flex-1">
          <div>
            <h1 className="text-2xl font-medium text-gray-600">Shipping</h1>
            <div className="md:flex gap-2 my-2">
              <strong className="text-gray-600">Address:</strong>
              <div></div>
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

export default OrderScreen;
