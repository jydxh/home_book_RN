import "@/global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
export default function RootLayout() {
	const queryClient = new QueryClient();
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<QueryClientProvider client={queryClient}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="login"
						options={{ headerShown: false, presentation: "modal" }}
					/>
				</Stack>
				<Toast />
			</QueryClientProvider>
		</ClerkProvider>
	);
}
