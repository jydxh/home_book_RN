import { useFetchFavListDetails } from "@/api/productsApi";
import MyButton from "@/components/ui/MyButton";
import ProductCard from "@/components/ui/ProductCard";
import { ProductType } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";

import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Toast from "react-native-toast-message";
export default function MyFavListPage() {
	const { isSignedIn } = useAuth();
	const router = useRouter();

	if (isSignedIn !== true) {
		Toast.show({
			type: "error",
			text1: "Login to View the Favourite List",
			text1Style: { fontSize: 16 },
			position: "bottom",
		});
		router.push("/login");
	}

	const { data, isPending, isError, isLoading } = useFetchFavListDetails();

	const renderProductCard = useCallback(
		({ item }: { item: ProductType }) => {
			const favList = data?.data.flatMap(item => item.id) || [];
			return (
				<ProductCard
					product={item}
					favList={favList || []}
					favListLoading={isPending}
				/>
			);
		},
		[data?.data, isPending]
	);

	if (isSignedIn !== true) {
		return null; // Prevent rendering the page content while redirecting
	}

	if (isError)
		return (
			<View className="my-auto mx-auto w-[90%]">
				<Text className="text-lg text-center">
					Error in fetching favourite list details
				</Text>
				<MyButton
					text="Back Home"
					wrapperClassName="mt-2 w-[70%] mx-auto"
					onPress={() => router.push("/")}
				/>
			</View>
		);

	if (isLoading)
		return (
			<View className="flex-1">
				<ActivityIndicator color="#FF6467" size="large" className="my-auto" />
			</View>
		);
	if (data) {
		return (
			<View>
				<FlatList
					className="mt-2"
					showsVerticalScrollIndicator={false}
					columnWrapperClassName="mx-auto gap-4"
					contentContainerStyle={{
						paddingBottom: 150,
					}}
					data={data.data}
					numColumns={2}
					ListEmptyComponent={() => (
						<Text className="mx-auto my-10 text-xl">No items found</Text>
					)}
					renderItem={renderProductCard}
					keyExtractor={item => item.id}
				/>
			</View>
		);
	}
}
