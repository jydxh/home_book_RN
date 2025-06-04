import { useFetchOrderById } from "@/api/productsApi";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data } = useFetchOrderById(id);
	return (
		<SafeAreaView>
			<Text>OrderDetailPage, id: {id}</Text>
			<Text>{JSON.stringify(data, null, 2)}</Text>
		</SafeAreaView>
	);
}
