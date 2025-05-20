import LoginComponents from "@/components/login/LoginComponents";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginPage() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) return <Redirect href={"/"} />;

	return (
		<SafeAreaView className="flex-1">
			<LoginComponents />
		</SafeAreaView>
	);
}
