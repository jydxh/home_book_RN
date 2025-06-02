import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
export default function RatingStar({
	rate,
}: {
	rate: { rating: string; count: number };
}) {
	return (
		<View className="gap-x-4 flex-row items-center">
			<FontAwesome name="star" size={20} color="red" />
			<Text className="text-lg">
				{rate.rating} ({rate.count})
			</Text>
		</View>
	);
}
