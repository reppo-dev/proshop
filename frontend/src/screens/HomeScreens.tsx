import type { Product } from "@/interface/products";
import { products } from "../product";

const HomeScreens = () => {
  return (
    <div>
      <h1 className="my-4">Latest Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <div key={product.ID}>
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreens;
