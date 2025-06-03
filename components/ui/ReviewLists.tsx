import { useFetchProductReviews } from "@/api/productsApi";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SingleReview from "./SingleReview";

export default function ReviewLists({ productId }: { productId: string }) {
	const { data, isLoading, error } = useFetchProductReviews(productId);
	if (isLoading)
		return (
			<View className="mx-auto">
				<ActivityIndicator
					size="large"
					color="#FF6467"
					className="justify-center items-center"
				/>
			</View>
		);
	if (error) return <Text>Error in fetch ReviewLists, please try again</Text>;
	if (data)
		return (
			<View>
				<FlatList
					data={data.reviews}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <SingleReview reviewDetail={item} />}
				/>
			</View>
		);
}
