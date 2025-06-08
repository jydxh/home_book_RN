import { useFetchOrders } from "@/api/productsApi";
import MyButton from "@/components/ui/MyButton";
import OrderCard from "@/components/ui/OrderCard";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function MyOrder() {
	const { isSignedIn, isLoaded } = useAuth();
	const router = useRouter();
	/* only when clerk is loaded and user not login,
	will push user to login page */
	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			Toast.show({
				type: "error",
				text1: "Please Login to View the Order Lists",
				text1Style: { fontSize: 16 },
				position: "bottom",
			});
			router.push("/login");
		}
	}, [isLoaded, isSignedIn, router]);

	const { data, isLoading, isError } = useFetchOrders();

	if (isLoading)
		return (
			<ActivityIndicator
				size="large"
				color="#FF6467"
				className="mt-20 justify-center items-center"
			/>
		);
	if (isError)
		return (
			<View className="mx-auto mt-10 items-center">
				<Text className="font-bold text-xl">
					Error in Fetching the Orders, please try again
				</Text>
			</View>
		);
	if (data) {
		return (
			<SafeAreaView edges={["left", "right", "bottom"]}>
				<Text className="font-bold text-2xl mx-auto my-6">
					Lists of Your Orders
				</Text>
				{data.bookings.length === 0 ? (
					<View className="px-8">
						<Text className="text-xl mb-10">
							You have not make any order yet, why not browse the property
							first.
						</Text>
						<MyButton text="Back Home" onPress={() => router.replace("/")} />
					</View>
				) : (
					<View>
						<FlatList
							data={data.bookings}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{
								padding: 10,
								rowGap: 10,
								paddingBottom: 120,
							}}
							renderItem={({ item }) => (
								<OrderCard
									orderId={item.id}
									checkIn={item.checkIn}
									checkOut={item.checkOut}
									createdDate={item.createdAt}
									image={item.property.image[0].imageUrl}
									orderStatus={item.orderStatus}
									productName={item.property.name}
									totalNight={item.totalNight}
								/>
							)}
							keyExtractor={item => item.id}
						/>
					</View>
				)}
			</SafeAreaView>
		);
	}
}
