import { backendProxyUrl } from "@/constants/baseUrls";
import {
	FetchedFavListDetailResponse,
	FetchedProductsResponse,
	OrdersListResponse,
	Property,
	ReviewResponse,
} from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

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

const toggleFav = async ({
	productId,
	token,
}: {
	productId: string;
	token: string | null;
}) => {
	const response = await fetch(backendProxyUrl + "/api/favlist", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "application/json",
		},
		body: JSON.stringify({ productId }),
	});
	if (!response.ok) throw new Error("error in toggle fav action");
	const result = await response.json();
	return result as { msg: string; status: "success" };
};

export const useToggleFavButton = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: toggleFav,

		onMutate: async ({ productId }) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ["favList"] });
			await queryClient.cancelQueries({ queryKey: ["favListDetails"] });
			// save the previous favlist for rollback
			const prevFavList = queryClient.getQueryData<string[]>(["favList"]);
			const prevFavListDetails =
				queryClient.getQueryData<FetchedFavListDetailResponse>([
					"favListDetails",
				]) ?? { data: [] };
			// optimum UI update logic below
			queryClient.setQueryData<string[]>(["favList", true], (old = []) => {
				return old.includes(productId)
					? old.filter(id => id !== productId)
					: [...old, productId];
			});
			queryClient.setQueryData<FetchedFavListDetailResponse>(
				["favListDetails", true],
				(old = { data: [] }) => {
					const exists = old.data.some(item => item.id === productId);
					const found = prevFavListDetails.data.find(
						item => item.id === productId
					);
					return {
						data: exists
							? old.data.filter(item => item.id !== productId)
							: found
							? [...old.data, found]
							: old.data,
					};
				}
			);
			// if the mutation fails, use the context we return	above
			return { prevFavList, prevFavListDetails };
		},
		onError: (_err, _data, context) => {
			if (context?.prevFavList && context?.prevFavListDetails) {
				queryClient.setQueryData(["favList", true], context.prevFavList);
				queryClient.setQueryData(
					["favListDetails", true],
					context.prevFavListDetails
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["favList", true] });
			queryClient.invalidateQueries({ queryKey: ["favListDetails", true] });
		},
	});
};

export const useFetchFavListDetails = () => {
	const { getToken, isSignedIn } = useAuth();

	return useQuery({
		queryKey: ["favListDetails", isSignedIn],
		enabled: isSignedIn === true,
		queryFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/favlist/details", {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("error at fetchFavListDetails");
			const result = await response.json();
			return result as FetchedFavListDetailResponse;
		},
	});
};

export const useFetchProductWithId = ({ productId }: { productId: string }) => {
	return useQuery({
		queryKey: ["productDetail", productId],
		queryFn: async () => {
			const response = await fetch(
				backendProxyUrl + "/api/products/detail?productId=" + productId
			);
			if (!response.ok) throw new Error("error in fetch product details");
			const result = await response.json();

			return result as { data: Property };
		},
	});
};

export const useBookingProperty = ({
	productId,
	checkIn,
	checkOut,
	onError,
	onSettled,
	onSuccess,
}: {
	productId: string;
	checkIn: string;
	checkOut: string;
	onSuccess?: (data: { bookingId: string }) => void;
	onError?: (error: unknown) => void;
	onSettled?: () => void;
}) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/products/booking", {
				method: "POST",
				body: JSON.stringify({ productId, checkIn, checkOut }),
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("error in booking property");
			const result = (await response.json()) as { bookingId: string };
			//	console.log("result:", result);
			return result;
		},
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ["productDetail", productId] });
			queryClient.invalidateQueries({ queryKey: ["fetchAllOrders"] });
			onSuccess?.(data);
		},
		onError: error => {
			onError?.(error);
		},
		onSettled: () => {
			onSettled?.();
		},
	});
};

export const useCreateReview = ({
	rating,
	comment,
	productId,
	onSuccess,
	onError,
}: {
	rating: number;
	comment: string;
	productId: string;
	onSuccess: () => void;
	onError: () => void;
}) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/products/review", {
				method: "POST",
				body: JSON.stringify({ rating, comment, productId }),
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("error in create review action");
			const result = await response.json();
			//console.log("result:", result);
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["productDetail", productId],
			});
			onSuccess();
		},
		onError: () => {
			onError();
		},
	});
};

export const useFetchProductReviews = (productId: string) => {
	return useQuery({
		queryKey: ["fetchProductReviews", productId],
		queryFn: async () => {
			const response = await fetch(
				backendProxyUrl + "/api/products/review?productId=" + productId
			);
			if (!response.ok) throw new Error("error in fetching product reviews");
			const result = await response.json();
			//	console.log("result:", result);
			return result as ReviewResponse;
		},
	});
};

export const useFetchOrders = () => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: ["fetchAllOrders"],
		queryFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/products/booking", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("error in fetching orders");
			const result = (await response.json()) as OrdersListResponse;
			//	console.log("fetching order result:", result);
			return result;
		},
	});
};

export const useFetchOrderById = (orderId: string) => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: ["fetchOrderById", orderId],
		queryFn: async () => {
			const token = await getToken();
			const response = await fetch(
				backendProxyUrl + "/api/products/bookingDetail?orderId=" + orderId,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-type": "application/json",
					},
				}
			);
			if (!response.ok) throw new Error("error in fetch order by id");
			const result = await response.json();
			console.log("result from fetch order by ID", result);
			return result;
		},
	});
};
