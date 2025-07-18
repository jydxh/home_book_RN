import "@/global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
export default function RootLayout() {
	const queryClient = new QueryClient();
	return (
		<>
			<ClerkProvider tokenCache={tokenCache}>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen
							name="products/[id]/index"
							options={{ headerShown: true, headerTitleAlign: "center" }}
						/>
						<Stack.Screen
							name="orders/[id]/index"
							options={{
								headerShown: true,
								headerTitleAlign: "center",
								title: "Order Detail",
							}}
						/>
						<Stack.Screen
							name="login"
							options={{ headerShown: false, presentation: "modal" }}
						/>
						<Stack.Screen
							name="reviews/index"
							options={{
								headerShown: true,
								headerTitleAlign: "center",
								title: "My Reviews",
							}}
						/>
					</Stack>
					<Toast />
				</QueryClientProvider>
			</ClerkProvider>
			<StatusBar />
		</>
	);
}
