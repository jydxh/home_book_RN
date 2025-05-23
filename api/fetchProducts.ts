import { backendProxyUrl } from "@/constants/baseUrls";
import { FetchedProductsResponse } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchProducts = ({ category }: { category?: string }) => {
	return useQuery({
		queryKey: ["products"],
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

export const useFetchFavList = (
	setFavList: React.Dispatch<React.SetStateAction<string[] | null>>
) => {
	const { isSignedIn, getToken } = useAuth();
	useEffect(() => {
		(async () => {
			if (isSignedIn) {
				try {
					const token = await getToken();
					const response = await fetch(backendProxyUrl + "/api/favlist", {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-type": "application/json",
						},
					});
					if (!response.ok) throw new Error("error on fetching favList");
					const data = await response.json();
					if (data.data) setFavList(data.data);
				} catch (error) {
					console.log(error);
					return [];
				}
			}
		})();
	}, [getToken, isSignedIn]);
};
