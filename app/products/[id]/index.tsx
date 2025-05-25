import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	return (
		<View>
			<Text>ProductDetailPage, productID: {id}</Text>
		</View>
	);
}
