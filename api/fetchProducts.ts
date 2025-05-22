import { backendProxyUrl } from "@/constants/baseUrls";
import { FetchedProductsResponse } from "@/constants/types";

export const fetchProducts = async ({
	category,
}: {
	category?: string;
}): Promise<FetchedProductsResponse | undefined> => {
	try {
		const url = new URL(backendProxyUrl + "/api/products");

		if (category) url.searchParams.set("category", category);

		const response = await fetch(url);

		if (!response.ok) throw new Error("error at fetching data");
		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};
