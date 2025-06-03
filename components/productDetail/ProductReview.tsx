import React from "react";
import { Text, View } from "react-native";
import ReviewLists from "../ui/ReviewLists";
import CreateReview from "./CreateReview";

export default function ProductReview({
	showReview,
	productId,
}: {
	showReview: boolean;
	productId: string;
}) {
	return (
		<>
			<View>
				<Text className="font-semibold text-xl ">Reviews:</Text>
				{/* this component will be conditional rendering later, only when the user login and user has book the property and also this property is not belongs to the user */}
				{showReview && <CreateReview productId={productId} />}
			</View>
			<View className="mt-4 ">
				<ReviewLists productId={productId} />
			</View>
		</>
	);
}
