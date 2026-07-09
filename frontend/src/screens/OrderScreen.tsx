import Loading from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserOrderQuery } from "@/redux/slices/orderApiSlice";
import { Link, useParams } from "react-router-dom";

const OrderScreen = () => {
  const { id } = useParams();
  const orderId = Number(id);

  const { data: order, isLoading, error } = useUserOrderQuery(orderId);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex w-full items-center justify-center">
        <p>Error loading order</p>
      </div>
    );

  if (!order)
    return (
      <div className="flex w-full items-center justify-center">
        <p>Order not found</p>
      </div>
    );

  return (
    <div className="flex flex-col w-full items-center justify-center my-4">
      <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-5xl">
        <div className="flex flex-col gap-4 w-full flex-1">
          <div>
            <h1 className="text-2xl font-medium text-gray-600">Shipping</h1>
            <div className="md:flex gap-2 my-2">
              <strong className="text-gray-600">Address:</strong>
              <p className="text-gray-500">
                {order.order_address?.user_address},{order.order_address?.city},
                {order.order_address?.postal_code},
                {order.order_address?.country}
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
              <p className="text-gray-500">{order.status || "Not specified"}</p>
            </div>
          </div>
          <hr />

          <div>
            <h1 className="text-2xl font-medium text-gray-600">Order Items</h1>
            {!order.items || order.items.length === 0 ? (
              <p className="text-gray-500">No items in this order</p>
            ) : (
              <div>
                {order.items.map((item) => (
                  <div key={item.ID} className="border-b ml-4 mt-2">
                    <div className="flex gap-8 justify-between items-center py-2">
                      <div className="flex gap-4 items-center justify-center">
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="w-16 h-16 rounded-sm object-contain"
                        />
                        <Link
                          to={`/products/${item.product?.ID || item.product_id}`}
                        >
                          {item.product?.name || "Unknown Product"}
                        </Link>
                      </div>
                      <div>
                        {item.quantity} x ${item.price?.toFixed(2) || "0.00"} =
                        ${((item.quantity || 0) * (item.price || 0)).toFixed(2)}
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
              <p>${order.total_price?.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex items-center justify-between">
              <h4>Shipping:</h4>
              <p>${order.shipping?.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex items-center justify-between">
              <h4>Tax:</h4>
              <p>${order.tax?.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex items-center justify-between">
              <h4>Total:</h4>
              <p>${order.total_price?.toFixed(2) || "0.00"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderScreen;
