import { backendProxyUrl } from "@/constants/baseUrls";

export const fetchDemoUserToken = async () => {
	try {
		const res = await fetch(backendProxyUrl + "/api/auth/getToken", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) throw new Error("error in fetch data");
		const data = await res.json();
		return data as { token: string };
	} catch (error) {
		console.log("error from fetching demo user token", error);
	}
};
