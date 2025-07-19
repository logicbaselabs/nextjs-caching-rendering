import { getData } from "@/app/utils/api-helpers";
import { revalidateTag } from "next/cache";

export default async function Page({ params }) {
    const { id } = await params;

    const products = await getData(
        "http://localhost:8000/products",
        "Dynamic Page",
        { cache: "force-cache", next: { tags: ["products"] } }
    );
    const otherProducts = products.filter((p) => p.id.toString() !== id);

    const product = await getData(
        `http://localhost:8000/products/${id}`,
        "Dynamic Page"
    );

    async function onRevalidateTagAction() {
        "use server";
        const tag = "products";
        console.log(`attempting to revalidate tag: '${tag}'`);
        revalidateTag(tag);
        console.log(`revalidate tag action ('${tag}') called.`);
    }

    return (
        <div>
            <h1 className="font-bold text-4xl">Data Cache - Dynamic page</h1>
            <div className="mt-6">
                This page is dynamically rendered in{" "}
                <span className="text-blue-400">
                    run time but uses Data Cache
                </span>
                .
            </div>
            <div className="mt-10 flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl">
                <h1>{product.title}</h1>
                <p>Price: {product.price}</p>
            </div>
            <div className="flex flex-col gap-10 mt-6 border rounded border-zinc-900 p-10">
                <h2 className="font-bold text-xl">Other products</h2>
                <div className="flex gap-6">
                    {otherProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex rounded gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center justify-center font-bold text-2xl"
                        >
                            {product.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-6 justify-end mt-10 border rounded border-zinc-900 p-10">
                <form action={onRevalidateTagAction}>
                    <button
                        type="submit"
                        className="border border-zinc-800 p-3 rounded cursor-pointer hover:bg-zinc-900"
                    >
                        Revalidate
                    </button>
                </form>
            </div>
        </div>
    );
}
