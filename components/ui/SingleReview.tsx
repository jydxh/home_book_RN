import { userDefaultAvatarUrl } from "@/constants/baseUrls";
import { Review } from "@/constants/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import moment from "moment";
import React from "react";
import { Image, Text, View } from "react-native";

export default function SingleReview({
	reviewDetail,
}: {
	reviewDetail: Review;
}) {
	const ratingStars: number[] = [];
	for (let i = 0; i < 5; i++) {
		if (i < reviewDetail.rating) {
			ratingStars.push(1);
		} else {
			ratingStars.push(0);
		}
	}
	return (
		<View className="border rounded-xl border-gray-500/40 p-10">
			{/* Reviewers image and info */}
			<View className="flex-row gap-x-4 items-center">
				<Image
					width={60}
					height={60}
					source={{
						uri: reviewDetail.user.profileImage || userDefaultAvatarUrl,
					}}
					className="w-[80px] h-[80px] rounded-full"
				/>
				<View>
					<Text className="font-bold text-xl tracking-wide">
						{reviewDetail.user.firstName}
					</Text>
					<View className="flex-row gap-2 ">
						<Text>{reviewDetail.user.city}, </Text>
						<Text>{reviewDetail.user.country}</Text>
					</View>
				</View>
			</View>
			{/* rating stat and created date */}
			<View className="flex-row gap-x-2 mt-4">
				<View className="flex-row gap-x-1">
					{ratingStars.map((item, index) => {
						if (item === 1)
							return (
								<FontAwesome
									key={index}
									size={20}
									name={"star"}
									color="#E11C48"
									className="w-5 h-5 "
								/>
							);
						else
							return (
								<FontAwesome
									key={index}
									size={20}
									color="#E11C48"
									name={"star-o"}
									className="w-5 h-5 "
								/>
							);
					})}
				</View>
				<Text className="font-lg ml-2">
					{moment(reviewDetail.createAt).format("MMMM YYYY")}
				</Text>
			</View>
			{/* review content */}
			<View className="mt-4">
				<Text className="text-xl">{reviewDetail.comment}</Text>
			</View>
		</View>
	);
}
