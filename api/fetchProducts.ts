import { backendProxyUrl } from "@/constants/baseUrls";
import { FetchedProductsResponse } from "@/constants/types";

export const fetchProducts = async (): Promise<
	FetchedProductsResponse | undefined
> => {
	try {
		const response = await fetch(backendProxyUrl + "/api/products");

		if (!response.ok) throw new Error("error at fetching data");
		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
	}
};
