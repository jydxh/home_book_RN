import { backendProxyUrl } from "@/constants/baseUrls";
import { FetchedProductsResponse } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFetchProducts = ({ category }: { category?: string }) => {
	return useQuery({
		queryKey: ["products", category],
		queryFn: async () => {
			try {
				const url = new URL(backendProxyUrl + "/api/products");

				if (category) url.searchParams.set("category", category);

				const response = await fetch(url);

				if (!response.ok) throw new Error("error at fetching data");
				const result = await response.json();

				return result as FetchedProductsResponse;
			} catch (error) {
				console.log(error);
			}
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
