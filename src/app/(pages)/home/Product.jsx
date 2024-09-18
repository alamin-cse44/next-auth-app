import ProductsCard from "@/app/components/ProductsCard";
import { getProducts } from "@/services/getProducts";


const Product = async () => {
  const data = await getProducts();
  return (
    <section className="py-16 container">
      <div className="text-center mb-12 flex flex-col gap-4">
        <h2 className="text-primary text-lg font-bold">Popular Products</h2>
        <h3 className="text-4xl font-bold">Browse Our Products</h3>
        <p className="text-gray-600 mt-2">
          The Majority Have Suffered Alteration In Some Form, By Injected
          Humour, Or Randomised <br /> Words Which Don&apos;t Look Even Slightly
          Believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((product) => (
          <ProductsCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="btn btn-outline btn-primary">More Product</button>
      </div>
    </section>
  );
};

export default Product;
