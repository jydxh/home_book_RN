import { ScrollView, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchProductWithId } from "@/api/productsApi";

export default function ProductDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data } = useFetchProductWithId({ productId: id });
	if (data)
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LinearGradient colors={["#E5E7EB", "#D4D4D4"]} className="flex-1">
					<ScrollView>
						<Text>{JSON.stringify(data, null, 2)}</Text>
					</ScrollView>
				</LinearGradient>
			</SafeAreaView>
		);
}
