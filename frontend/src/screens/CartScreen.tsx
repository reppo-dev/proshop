import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteCartItemMutation,
  useGetCardQuery,
  useUpdateAddToCartMutation,
} from "@/redux/slices/cartApiSlice";
import {
  removeFromCart,
  setCart,
  updateCartItem,
} from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { items } = cart;

  const { data } = useGetCardQuery();

  const [updateItem, { isLoading }] = useUpdateAddToCartMutation();

  const [deleteItem, { isLoading: loading }] = useDeleteCartItemMutation();

  const removeFromHandler = async (id: number) => {
    try {
      await deleteItem(id).unwrap();

      dispatch(removeFromCart(id));
    } catch (err) {
      console.error(err);
    }
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  useEffect(() => {
    if (!data) return;

    dispatch(
      setCart(
        data.items.map((item) => ({
          ID: item.ID,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          name: item.product.name,
          image: item.product.image,
          count_inStock: item.product.count_inStock,
        })),
      ),
    );
  }, [data, dispatch, navigate]);

  return (
    <div className="flex flex-col w-full mt-4">
      <p className="font-bold text-2xl ">Shopping Cart</p>
      <div className="md:flex block w-full gap-4">
        <div className="flex-1">
          {items.length === 0 ? (
            <div className="flex items-center justify-center w-full">
              <p>Cart item is empty</p>{" "}
              <Button onClick={() => navigate(-1)}>Go Back</Button>{" "}
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product_id}>
                <Card className="flex my-2 flex-row items-center justify-between">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 p-2 ml-2 rounded-sm object-contain"
                  />
                  <div>{item.name}</div>
                  <div>${item.price.toFixed(2)}</div>
                  <div className="flex mr-4 gap-2">
                    <Select
                      disabled={isLoading}
                      value={item.quantity.toString()}
                      onValueChange={async (value) => {
                        const res = await updateItem({
                          id: item.ID,
                          quantity: Number(value),
                        }).unwrap();

                        console.log(res);
                        dispatch(
                          updateCartItem({
                            product_id: item.product_id,
                            quantity: Number(value),
                          }),
                        );
                      }}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Quantity</SelectLabel>
                          {[...Array(item.count_inStock).keys()].map((x) => (
                            <SelectItem
                              defaultValue="1"
                              key={x + 1}
                              value={(x + 1).toString()}
                            >
                              {x + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      disabled={loading}
                      onClick={() => removeFromHandler(item.ID)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
        {items.length === 0 ? (
          <div></div>
        ) : (
          <Card className="mt-2 md:w-80 md:h-80 rounded-sm">
            <CardHeader>
              <h2>
                Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <CardDescription>
                $
                {items
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </CardDescription>
            </CardHeader>
            <hr />
            <CardContent>
              <Button
                type="button"
                className="rounded-sm py-4"
                variant={"default"}
                disabled={items.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Chechout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
