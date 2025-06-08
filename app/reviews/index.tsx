import { useFetchUserReviews } from "@/api/userApi";
import CountryWithFlag from "@/components/ui/CountryWithFlag";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import moment from "moment";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserReviewCard = ({
	comment,
	country,
	createAt,
	image,
	name,
	propertyId,
	rating,
}: {
	name: string;
	country: string;
	rating: number;
	image: string;
	propertyId: string;
	comment: string;
	createAt: Date;
}) => {
	const ratingStars: number[] = [];
	for (let i = 0; i < 5; i++) {
		if (i < rating) {
			ratingStars.push(1);
		} else {
			ratingStars.push(0);
		}
	}
	return (
		<View className="border border-gray-400 pb-2 rounded-lg">
			<Link href={{ pathname: "/products/[id]", params: { id: propertyId } }}>
				{/* image and property info */}
				<View className="flex-row items-center gap-4 mb-4">
					<Image
						source={{ uri: image }}
						width={160}
						height={160}
						resizeMode="cover"
					/>
					<View className="flex items-start gap-y-1">
						<Text className="text-lg font-semibold">{name}</Text>
						<View className="flex-row gap-x-4 items-center -ml-2">
							<CountryWithFlag country={country} spaceBetween={false} />
						</View>
						<View className="flex-row gap-x-2">
							<Text>Created At:</Text>
							<Text>{moment(createAt).format("MMMM D, YYYY")}</Text>
						</View>
					</View>
				</View>
			</Link>

			<HorizontalLine />
			{/* rating and comment */}
			<View className="ml-2">
				<View className="flex-row gap-x-2">
					<Text className="font-semibold text-lg">Rating: </Text>
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
				</View>
				<View>
					<Text className="font-semibold text-lg">Comment: </Text>
					<Text className="text-lg text-gray-600">{comment}</Text>
				</View>
			</View>
		</View>
	);
};

function ReviewsList() {
	const { data, isLoading, isError } = useFetchUserReviews();
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
	if (isError)
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Text className="mt-20 justify-center items-center text-center text-xl font-bold">
					An error at fetching data, please try again!
				</Text>
			</SafeAreaView>
		);
	return (
		<SafeAreaView edges={["bottom", "left", "right"]}>
			<FlatList
				style={{ marginTop: 20 }}
				data={data?.reviews}
				keyExtractor={item => item.id}
				contentContainerClassName="gap-y-4 px-4 pb-10"
				ListEmptyComponent={() => (
					<View className="mx-auto mt-10">
						<Text className="font-bold text-xl">
							You have not make any comment yet
						</Text>
					</View>
				)}
				renderItem={({ item }) => (
					<UserReviewCard
						name={item.property.name}
						comment={item.comment}
						country={item.property.country}
						createAt={item.createAt}
						image={item.property.image[0].imageUrl}
						propertyId={item.propertyId}
						rating={item.rating}
					/>
				)}
			/>
		</SafeAreaView>
	);
}

export default ReviewsList;
