import LoginComponents from "@/components/login/LoginComponents";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginPage() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) return <Redirect href={"/"} />;

	return (
		<LinearGradient className="flex-1" colors={["#96F7E4", "#14b8a6"]}>
			<SafeAreaView className="flex-1">
				<LoginComponents />
			</SafeAreaView>
		</LinearGradient>
	);
}
