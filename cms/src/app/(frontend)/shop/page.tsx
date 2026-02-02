import { fetchShopPage } from "@/lib/cms.server";
import ShopClient from "./ShopClient";

export default async function Shop() {
    const pageData = await fetchShopPage();

    // Serialize data to prevent enqueueModel errors
    const serializedPageData = pageData ? JSON.parse(JSON.stringify(pageData)) : null;

    return <ShopClient pageData={serializedPageData} />;
};
