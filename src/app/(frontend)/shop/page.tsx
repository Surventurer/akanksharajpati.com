import { fetchShopPage, fetchProducts, fetchProductCategories } from "@/lib/cms";
import ShopClient from "./ShopClient";

export default async function Shop() {
    const [pageData, collectionProducts, collectionCategories] = await Promise.all([
        fetchShopPage(),
        fetchProducts(),
        fetchProductCategories(),
    ]);

    // Serialize data to prevent enqueueModel errors
    const serializedPageData = pageData ? JSON.parse(JSON.stringify(pageData)) : null;
    const serializedProducts = collectionProducts ? JSON.parse(JSON.stringify(collectionProducts)) : [];
    const serializedCategories = collectionCategories ? JSON.parse(JSON.stringify(collectionCategories)) : [];

    return (
        <ShopClient
            pageData={serializedPageData}
            collectionProducts={serializedProducts}
            collectionCategories={serializedCategories}
        />
    );
};
