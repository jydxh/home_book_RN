import { useSignIn, useUser } from "@clerk/clerk-expo";

import { Text, TouchableOpacity, View } from "react-native";

import { backendPoxyUrl } from "@/constants/baseUrls";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
export default function Index() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const { isSignedIn } = useUser();
	const [signedIn, setSignedIn] = useState(isSignedIn);

	useEffect(() => {
		setSignedIn(isSignedIn); // Update local state when `isSignedIn` changes
	}, [isSignedIn]);

	const router = useRouter();

	const handleLoginDemoUser = async () => {
		if (signIn) {
			try {
				const res = await fetch(backendPoxyUrl + "/api/auth/getToken", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!res.ok) throw new Error("error in fetch data");

				const data = await res.json();
				console.log("result:", data);

				if (data.token) {
					// create the signIn with the token
					const signInAttempt = await signIn.create({
						strategy: "ticket",
						ticket: data.token as string,
					});
					if (signInAttempt.status === "complete") {
						setActive({
							session: signInAttempt.createdSessionId,
						});
						console.log("Demo user signed in successfully!");
						router.push("/");
					} else {
						// If the sign-in attempt is not complete, check why.
						// User may need to complete further steps.
						console.error(JSON.stringify(signInAttempt, null, 2));
					}
				}
			} catch (error) {
				console.log("error in fetch user token:", error);
			}
		} else {
			console.log("Sign-in not completed:");
		}
	};

	return (
		<View className="flex-1 bg-red-300  justify-center content-center">
			<Text>Sign In status: {signedIn ? "true" : "false"}</Text>
			{isLoaded && (
				<View className="mx-auto mt-2">
					<TouchableOpacity
						onPress={handleLoginDemoUser}
						className="bg-sky-400 p-4 rounded  w-[18rem]">
						<Text className="text-xl text-center"> Login as Demo User</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
