import ProductCount from "@/app/components/product-count";
import TotalPrice from "@/app/components/total-price";
import { getData } from "@/app/utils/api-helpers";

export async function generateMetadata() {
    const data = await getData(
        "http://localhost:8000/products",
        "generateMetadata()",
        {
            cache: "no-store",
        }
    );

    return {
        title: data.reduce(
            (title, product) => title + (title && ", ") + product?.title,
            ""
        ),
        description: "Apple iPhone 16 products",
    };
}

export default async function Page() {
    const products = await getData("http://localhost:8000/products", "Page", {
        cache: "no-store",
    });

    return (
        <div>
            <h1 className="font-bold text-4xl">Request Memoization</h1>
            <div className="mt-6">
                This page is statically rendered in{" "}
                <span className="text-blue-400">build time</span>. 3 components
                below do the same fetch call and deduped. Thanks to Request
                Memoization.
            </div>
            <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
                <div className="flex flex-col gap-4">
                    <ProductCount />
                    <div className="flex gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl"
                            >
                                {product.title}
                            </div>
                        ))}
                    </div>
                    <TotalPrice />
                </div>
            </div>
        </div>
    );
}
