import { backendProxyUrl } from "@/constants/baseUrls";
import { Profile, UserReviewsResponse } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchUserProfile = () => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: ["fetchUserProfile"],
		queryFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/auth/user", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("error in fetch user profile");
			const result = (await response.json()) as { profile: Profile };
			return result;
		},
	});
};

export const useUpdateUserProfile = ({
	firstName,
	lastName,
	onError,
	onSuccess,
	userName,
}: {
	userName: string;
	lastName: string;
	firstName: string;
	onSuccess: () => void;
	onError: () => void;
}) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/auth/user", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
				body: JSON.stringify({ userName, lastName, firstName }),
			});

			if (!response.ok) throw new Error("error in update user profile");
			const result = await response.json();
			console.log(result);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["fetchUserProfile"] });
			onSuccess();
		},
		onError: () => {
			onError();
		},
	});
};

export const useUpdateAvatar = ({
	onError,
	onSuccess,
}: {
	onSuccess: () => void;
	onError: () => void;
}) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			formData,
		}: {
			formData: FormData;
			imageUri: string;
		}) => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/auth/avatar", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					//"Content-type": "multipart/form-data",
				},
				body: formData,
			});
			if (!response.ok) throw new Error("error in update avatar");
			const result = (await response.json()) as { imageUrl: string };
			console.log(result);
		},

		onMutate: async ({ imageUri }: { imageUri: string }) => {
			// handling optimum ui update logic here
			await queryClient.cancelQueries({ queryKey: ["fetchUserProfile"] });
			const prevUserProfile = queryClient.getQueryData(["fetchUserProfile"]);

			queryClient.setQueryData(
				["fetchUserProfile"],
				(old: { profile: Profile }) => {
					if (!old) return old;
					return { profile: { ...old.profile, profileImage: imageUri } };
				}
			);

			return { prevUserProfile };
		},

		onError: (error, variables, context) => {
			// roll back
			queryClient.setQueryData(["fetchUserProfile"], context?.prevUserProfile);
			onError();
		},
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			// invalidate the query
			queryClient.invalidateQueries({ queryKey: ["fetchUserProfile"] });
		},
	});
};

export const useFetchUserReviews = () => {
	const { getToken } = useAuth();
	return useQuery({
		queryKey: ["fetchUserReviews"],
		queryFn: async () => {
			const token = await getToken();
			const response = await fetch(backendProxyUrl + "/api/auth/user/reviews", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			});
			if (!response.ok) throw new Error("error in fetch user reviews");
			const result = (await response.json()) as UserReviewsResponse;
			return result;
		},
	});
};
