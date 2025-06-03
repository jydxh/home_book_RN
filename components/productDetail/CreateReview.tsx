import { useCreateReview } from "@/api/productsApi";
import { useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import MyButton from "../ui/MyButton";

const starArray = [1, 2, 3, 4, 5];

export default function CreateReview({ productId }: { productId: string }) {
	const [isShowing, setIsShowing] = useState(false);
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");
	const router = useRouter();
	const { isSignedIn } = useAuth();

	const { mutate, isPending, isError, isSuccess } = useCreateReview({
		comment,
		productId,
		rating,
	});

	const handleSubmit = () => {
		if (!isSignedIn) router.push("/login");
		mutate();
	};

	useEffect(() => {
		if (isError) {
			Toast.show({
				type: "error",
				position: "bottom",
				text1: "An error met, please try again",
				text1Style: { fontSize: 16 },
			});
		}
	}, [isError]);

	useEffect(() => {
		if (isSuccess) {
			setIsShowing(false);
			Toast.show({
				type: "success",
				position: "bottom",
				text1: "Successfully leave a comment!",
				text1Style: { fontSize: 16 },
			});
		}
	}, [isSuccess]);

	return (
		<>
			<View className="my-4">
				<MyButton
					text={isShowing ? "Hide the Form" : "Leave a Review"}
					wrapperClassName="bg-transparent border w-[50%] mx-auto border-gray-500/40 rounded"
					textClassName="text-lg"
					textColorClass="text-black"
					onPress={() => {
						setIsShowing(prev => !prev);
					}}
				/>

				{isShowing && (
					<View className="p-4 mt-4 border rounded border-gray-500/40 gap-y-4">
						{/* rating row */}
						<View className="flex-row gap-x-4 items-center justify-start">
							<Text className="font-semibold text-lg">Rating: </Text>
							<View className="flex-row gap-x-1 -top-0.5">
								{starArray.map((item, index) => {
									return (
										<Pressable
											onPress={() => {
												setRating(item);
											}}
											className="w-5 h-5"
											key={item}>
											{index < rating ? (
												<FontAwesome name="star" size={20} color="#E11C48" />
											) : (
												<FontAwesome name="star-o" size={20} color="#E11C48" />
											)}
										</Pressable>
									);
								})}
							</View>
							<Text className="text-lg font-semibold"> ( {rating} / 5 )</Text>
						</View>

						{/* comment */}
						<View>
							<Text className="font-semibold text-lg">Comments:</Text>
							<TextInput
								value={comment}
								onChangeText={setComment}
								className="border border-gray-500/40 rounded mt-2 h-[120px] p-4"
								numberOfLines={5}
								textAlignVertical="top"
								multiline
							/>
						</View>
						{/* Buttons */}
						<View className="flex-row justify-center items-center gap-x-4">
							<MyButton
								disabled={isPending}
								spinning={isPending}
								text="Submit"
								wrapperClassName="w-[30%]"
								onPress={handleSubmit}
							/>
							<MyButton
								disabled={isPending}
								wrapperClassName="w-[30%]"
								bgColor="bg-gray-500"
								text="Reset"
								onPress={() => {
									setRating(5);
									setComment("");
								}}
							/>
						</View>
					</View>
				)}
			</View>
		</>
	);
}
