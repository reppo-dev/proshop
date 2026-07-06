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
import { removeFromCart, updateCartItem } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { items } = cart;

  const removeFromHandler = async (id: number) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

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
                  <div>${item.price}</div>
                  <div className="flex mr-4 gap-2">
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) => {
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

                    <Button onClick={() => removeFromHandler(item.ID)}>
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
