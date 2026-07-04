import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProductInfoQuery } from "@/redux/slices/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductScreen = () => {
  const { id } = useParams();

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

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
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
                  {product.countInStock > 0 ? `In Stock` : "Out Of Stock"}
                </strong>
              </div>
              <div>
                <Button>Add To Cart</Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
