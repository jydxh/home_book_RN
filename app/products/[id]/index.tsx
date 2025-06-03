import { useFetchFavList, useFetchProductWithId } from "@/api/productsApi";
import ProductDetail from "@/components/productDetail/ProductDetail";
import SingleReview from "@/components/ui/SingleReview";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data, isLoading, isError } = useFetchProductWithId({ productId: id });
	const navigation = useNavigation();
	const {
		data: favList,
		isLoading: favListLoading,
		isError: favListError,
	} = useFetchFavList();

	useEffect(() => {
		if (data) {
			navigation.setOptions({
				headerTitle: () => (
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							textAlign: "center",
							width: 300,
						}}
						numberOfLines={1}
						ellipsizeMode="tail">
						{data.data.name}
					</Text>
				),
			});
		} else {
			navigation.setOptions({
				headerTitle: () => <ActivityIndicator color="#99A1AE" />,
			});
		}
	}, [navigation, data]);

	if (isLoading || favListLoading)
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<ActivityIndicator
					size="large"
					color="#FF6467"
					className="mt-20 justify-center items-center"
				/>
			</SafeAreaView>
		);
	if (isError || favListError)
		return (
			<SafeAreaView
				style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
				<Text className="text-xl justify-center items-center">
					An error occurred while fetching data, please try again
				</Text>
			</SafeAreaView>
		);
	if (data)
		return (
			<SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
				<LinearGradient colors={["#E5E7EB", "#D4D4D4"]} className="flex-1">
					<FlatList
						data={data.data.reviews}
						renderItem={({ item }) => <SingleReview reviewDetail={item} />}
						keyExtractor={item => item.id}
						ListHeaderComponent={
							<ProductDetail
								product={data.data}
								isFav={(favList || []).includes(data.data.id)}
							/>
						}
						contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
					/>
				</LinearGradient>
			</SafeAreaView>
		);
}
