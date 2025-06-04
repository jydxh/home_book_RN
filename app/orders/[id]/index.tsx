import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	return (
		<SafeAreaView>
			<Text>OrderDetailPage, id: {id}</Text>
		</SafeAreaView>
	);
}
