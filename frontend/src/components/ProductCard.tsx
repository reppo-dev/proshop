import type { Product } from "@/interface/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <Card>
        <CardHeader className="">
          <Link to={`/product/${product.ID}`}>
            <div className="container flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-64 h-64"
              />
            </div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription className="line-clamp-2 md:line-clamp-3">
              {product.description}
            </CardDescription>
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div>
            <Rating text={product.numReviews} value={product.rating} />
          </div>
          <div>Price:${product.price}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
