import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchProductWithId } from "@/api/productsApi";
import ProductDetail from "@/components/productDetail/ProductDetail";
import { HeaderTitle } from "@react-navigation/elements";

export default function ProductDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data, isLoading, isError } = useFetchProductWithId({ productId: id });
	const navigation = useNavigation();

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
				title: "loading...",
			});
		}
	}, [navigation, data]);

	if (isLoading)
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<ActivityIndicator
					size="large"
					color="#FF6467"
					className="mt-20 justify-center items-center"
				/>
			</SafeAreaView>
		);
	if (data)
		return (
			<SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
				<LinearGradient colors={["#E5E7EB", "#D4D4D4"]} className="flex-1">
					<ScrollView className="px-2">
						<ProductDetail product={data.data} />
					</ScrollView>
				</LinearGradient>
			</SafeAreaView>
		);
}
