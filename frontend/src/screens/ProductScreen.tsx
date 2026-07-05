import Loading from "@/components/Loading";
import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addToCart } from "@/redux/slices/cartSlice";
import { useGetProductInfoQuery } from "@/redux/slices/productApiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductScreen = () => {
  const { id } = useParams();

  const [qty, setQty] = useState<number>(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  if (!id) {
    return (
      <div className="flex items-center justify-center">
        We Can't Find Product
      </div>
    );
  }
  const productId = parseInt(id);

  const {
    isLoading,
    isError,
    error,
    data: product,
  } = useGetProductInfoQuery(productId);

  if (!product) {
    return <div>We Can't Find Product</div>;
  }

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ID: product.ID,
        product_id: product.ID,
        name: product.name,
        image: product.image,
        price: product.price,
        count_inStock: product.count_inStock,
        quantity: qty,
      }),
    );

    toast.success("Added to cart");
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : isError ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div className="space-y-4 mt-4">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <img
              className="w-full max-w-sm "
              src={product.image}
              alt={product.name}
            />
            <div className="flex flex-col gap-4 items-center md:w-[40%] justify-center">
              <p className="py-2">{product.name}</p>
              <div className="border-t w-full border-b flex items-center justify-center py-4">
                <Rating text={product.numReviews} value={product.rating} />
              </div>
              <div className="py-2">{product.price}</div>
            </div>
            <Card className="rounded-none max-w-sm flex flex-col items-center justify-center">
              <div className="w-full px-6 font-medium flex items-center mx-12 justify-between">
                <p>Price:</p> <div>${product.price}</div>
              </div>
              <div className="border py-4 w-full flex items-center justify-between">
                <p className="pl-6 font-medium">Status:</p>
                <strong className="pr-6">
                  {product.count_inStock > 0 ? `In Stock` : "Out Of Stock"}
                </strong>
              </div>
              <div className="flex pb-4 px-4 items-center justify-between border-b w-full">
                <p className="pl-2 font-medium">Qty:</p>
                <div>
                  {product.count_inStock > 0 && (
                    <Select
                      value={qty.toString()}
                      onValueChange={(value) => setQty(Number(value))}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Quantity</SelectLabel>
                          {[...Array(product.count_inStock).keys()].map((x) => (
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
                  )}
                </div>
              </div>
              <div className="">
                <Button
                  disabled={product.count_inStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
