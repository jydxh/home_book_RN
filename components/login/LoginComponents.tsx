import { fetchDemoUserToken } from "@/actions/fetchDemoUserToken";
import { emailRegex } from "@/constants/regex";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import MyButton from "../ui/MyButton";
import { useQueryClient } from "@tanstack/react-query";
export default function LoginComponents({
	description = "Sign in to get more features",
}: {
	description?: string;
}) {
	const { signIn, setActive, isLoaded } = useSignIn();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const router = useRouter();
	const queryClient = useQueryClient();
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [emailError, setEmailError] = useState("");
	const [pwdError, setPwdError] = useState("");
	const handleLogin = async () => {
		if (!isLoaded) return;
		// user input validation
		if (!emailRegex.test(email))
			return setEmailError("Please enter a valid email address.");

		if (pwd.trim().length < 6)
			return setPwdError("Password must be at least 6 chars long");
		// pass then call clerk login api

		try {
			const signInAttempt = await signIn.create({
				identifier: email,
				password: pwd,
			});
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				// after successful login:

				queryClient.invalidateQueries({ queryKey: ["favList"] });
				router.back();
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				console.log(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (error) {
			console.log(error);
			setEmailError("invalid credential");
			setPwdError("invalid credential");
		}
	};

	const handleLoginDemoUser = async () => {
		if (!isLoaded) return;
		if (signIn) {
			try {
				setIsSubmitting(true);
				const data = await fetchDemoUserToken();
				//	console.log("result:", data);

				if (data?.token) {
					// create the signIn with the token
					const signInAttempt = await signIn.create({
						strategy: "ticket",
						ticket: data.token as string,
					});
					if (signInAttempt.status === "complete") {
						await setActive({
							session: signInAttempt.createdSessionId,
						});
						console.log("Demo user signed in successfully!");
						queryClient.invalidateQueries({ queryKey: ["favList"] });
						router.back();
					} else {
						// If the sign-in attempt is not complete, check why.
						// User may need to complete further steps.
						console.log(JSON.stringify(signInAttempt, null, 2));
					}
				}
			} catch (error) {
				console.log("error in fetch user token:", error);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			console.log("Sign-in not completed:");
		}
	};
	return (
		<KeyboardAvoidingView
			className="flex-1 mt-14"
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
				keyboardShouldPersistTaps="handled">
				<View className="px-10 ">
					{/* Welcome*/}
					<View>
						<Text className="font-bold text-2xl">
							Hi, Welcome to HomeBook 👋
						</Text>
						<Text className="text-gray-500 mt-2">{description}</Text>
					</View>
					{/* hr */}
					<View className="my-10 border-b w-full border-gray-400" />
					{/* pwd login */}
					<View className="gap-2">
						<View className="gap-2">
							<Text className="font-semibold text-lg">Email Address</Text>
							<TextInput
								onChangeText={evt => {
									setEmailError("");
									setEmail(evt);
								}}
								value={email}
								textContentType="emailAddress"
								placeholder="please enter your email here"
								className="border rounded p-2"
							/>
							{/* email error */}
							<Text className="text-red-500">{emailError}</Text>
						</View>
						<View className="gap-2">
							<Text className="font-semibold text-lg">Password</Text>
							<TextInput
								onChangeText={evt => {
									setPwdError("");
									setPwd(evt);
								}}
								value={pwd}
								secureTextEntry
								textContentType="password"
								placeholder="please enter your email here"
								className="border rounded p-2"
							/>
							{/* pwd error */}
							<Text className="text-red-500">{pwdError}</Text>
						</View>
						{/* login button */}
						<View>
							<MyButton
								onPress={handleLogin}
								text="Login"
								textClassName="text-lg"
								disabledClassName="bg-gray-400"
								disabled={isSubmitting}
							/>
						</View>
						{/* Login as demo user button */}
						<View>
							<MyButton
								disabled={isSubmitting}
								onPress={handleLoginDemoUser}
								text="Login as Demo User"
								wrapperClassName="bg-cyan-500"
								textClassName="text-lg"
								disabledClassName="bg-gray-400"
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
