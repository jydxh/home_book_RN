import { backendProxyUrl } from "@/constants/baseUrls";
import { FetchedProductsResponse } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useFetchProducts = ({
	category,
	search,
}: {
	category?: string;
	search?: string;
}) => {
	return useInfiniteQuery({
		queryKey: ["products", category, search],
		queryFn: async ({ pageParam }) => {
			const url = new URL(backendProxyUrl + "/api/products");

			if (category) url.searchParams.set("category", category);
			if (search) url.searchParams.set("search", search);
			if (pageParam) url.searchParams.set("page", pageParam.toString());

			const response = await fetch(url);
			if (!response.ok) throw new Error("error at fetching data");
			const result = await response.json();
			return result as FetchedProductsResponse;
		},
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			if (!lastPage) return undefined;
			const current = lastPage.data.currentPage;
			const total = lastPage.data.totalPage;
			return current < total ? Number(current) + 1 : undefined;
		},
	});
};

export const useFetchFavList = () => {
	const { isSignedIn, getToken } = useAuth();
	// console.log("isSignedIn:", isSignedIn);

	return useQuery({
		queryKey: ["favList", isSignedIn],
		//  since at first component mounting, clerk might not mounted yet,
		// and isSingedIn can be undefined, so we need to compare isSignedIn with true,
		// to make sure only when it is true this query will be executed
		enabled: isSignedIn === true,
		queryFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/favlist", {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("Error on fetching favList");
			const data = await response.json();
			return (data.data as string[]) ?? [];
		},
	});
};

export const toggleFavAction = async (
	productId: string,
	token: string | null
) => {
	try {
		const response = await fetch(backendProxyUrl + "/api/favlist", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
			body: JSON.stringify({ productId }),
		});
		if (!response.ok) throw new Error("error in ");
		const result = await response.json();
		return result as { msg: string; status: "success" };
	} catch (error) {
		console.log(error);
		return { msg: "error in toggle fav", status: "failed" };
	}
};
