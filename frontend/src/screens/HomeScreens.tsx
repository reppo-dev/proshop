import type { Product } from "@/interface/products";
import { products } from "../product";
import ProductCard from "@/components/ProductCard";

const HomeScreens = () => {
  return (
    <div>
      <h1 className="my-4">Latest Products</h1>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <div key={product.ID}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreens;
