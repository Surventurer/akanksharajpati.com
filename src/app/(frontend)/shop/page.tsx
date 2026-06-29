import { fetchShopPage } from "@/lib/cms";
import ShopClient from "./ShopClient";

// Force dynamic rendering to always fetch fresh CMS data
export const dynamic = 'force-dynamic'

export default async function Shop() {
    const pageData = await fetchShopPage();

    // Serialize data to prevent enqueueModel errors
    const serializedPageData = pageData ? JSON.parse(JSON.stringify(pageData)) : null;

    return <ShopClient pageData={serializedPageData} />;
};
