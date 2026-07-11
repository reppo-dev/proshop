import type { Product } from "@/interface/products";

import ProductCard from "@/components/ProductCard";
import { useGetProductsQuery } from "@/redux/slices/productApiSlice";
import Loading from "@/components/Loading";

const HomeScreens = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery("");

  return (
    <div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : isError ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <>
          <h1 className="my-4">Latest Products</h1>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {products.map((product: Product) => (
              <ProductCard key={product.ID} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreens;
