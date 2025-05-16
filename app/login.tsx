import { fetchDemoUserToken } from "@/actions/fetchDemoUserToken";
import LoginComponents from "@/components/login/LoginComponents";
import { useAuth, useClerk, useSignIn } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginPage() {
	const { isSignedIn } = useAuth();
	const { signIn, setActive, isLoaded } = useSignIn();
	const { signOut } = useClerk();

	const router = useRouter();

	const handleLoginDemoUser = async () => {
		console.log("clicked");
		if (signIn) {
			try {
				const data = await fetchDemoUserToken();
				console.log("result:", data);

				if (data?.token) {
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

	if (isSignedIn) return <Redirect href={"/"} />;

	return (
		<SafeAreaView>
			<LoginComponents />
		</SafeAreaView>
	);
}
