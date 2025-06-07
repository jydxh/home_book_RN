import { backendProxyUrl } from "@/constants/baseUrls";
import { Profile } from "@/constants/types";
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
