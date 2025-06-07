import { backendProxyUrl } from "@/constants/baseUrls";
import { Profile } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

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
			console.log("result:", result);
			return result;
		},
	});
};
