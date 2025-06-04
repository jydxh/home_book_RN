import { useBookingProperty } from "@/api/productsApi";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { Image, Modal, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import HorizontalLine from "../ui/HorizontalLine";
import MyButton from "../ui/MyButton";
import RatingStar from "./RatingStar";
export default function ConfirmBook({
	productId,
	showConfirmBook,
	setShowConfirmBook,
	imageUrl,
	price,
	propertyName,
	rate,
	selectedRange,
}: {
	productId: string;
	showConfirmBook: boolean;
	setShowConfirmBook: React.Dispatch<React.SetStateAction<boolean>>;
	imageUrl: string;
	propertyName: string;
	price: number;
	rate: {
		rating: string;
		count: number;
	};
	selectedRange: {
		start: string | null;
		end: string | null;
	};
}) {
	const router = useRouter();
	//console.log("checkin:", new Date(selectedRange.start!));
	const { mutate, isPending } = useBookingProperty({
		productId,
		checkIn: moment(selectedRange.start!).format("YYYY-MM-DD HH:mm:ss"),
		checkOut: moment(selectedRange.end!).format("YYYY-MM-DD HH:mm:ss"),
		onSuccess: data => {
			Toast.show({
				type: "success",
				text1: "Order Success",
				text1Style: { fontSize: 14 },
				position: "bottom",
			});
			setShowConfirmBook(false);
			// todo: redirect here using data.bookingId if needed
		},
		onError: () => {
			setShowConfirmBook(false);
			Toast.show({
				type: "error",
				text1: "Failed in Booking the property",
				text1Style: { fontSize: 14 },
				position: "bottom",
			});
		},
	});

	const handleConfirmBooking = () => mutate();
	const nights =
		selectedRange.start && selectedRange.end
			? moment(selectedRange.end).diff(moment(selectedRange.start), "days")
			: 0;
	const serviceFee = 200;
	const cleaningFee = 100;
	return (
		<Modal
			visible={showConfirmBook}
			transparent={false}
			backdropColor={"rgb(11,11,11,0.1)"}>
			<View className="mx-4 rounded p-10 justify-center bg-white my-auto">
				<Text className="font-bold text-xl mx-auto mb-4">
					Booking Confirmation
				</Text>

				<View className="flex-row justify-start gap-4">
					<Image
						className="w-[140px] h-[120px] rounded object-contain"
						source={{ uri: imageUrl }}
					/>
					<View className="justify-center gap-y-2 ">
						<Text
							className="text-lg w-[10rem]"
							numberOfLines={1}
							ellipsizeMode="tail">
							{propertyName}
						</Text>
						<RatingStar rate={rate} />
					</View>
				</View>
				<HorizontalLine />
				{/* price details */}
				<View className="gap-y-2">
					<Text className="font-semibold text-xl">Price Details</Text>
					<View className="flex-row justify-between">
						<Text className="tracking-wide text-lg">
							${price} CAD x {nights} night{nights > 1 && "s"}
						</Text>
						<Text className="tracking-wide text-lg">
							${(price * nights).toFixed()} CAD
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="tracking-wide underline text-lg">
							Cleaning fee
						</Text>
						<Text className="tracking-wide text-lg">${cleaningFee} CAD</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="tracking-wide underline text-lg">Service fee</Text>
						<Text className="tracking-wide text-lg">${serviceFee} CAD</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="tracking-wide underline text-lg">Tax</Text>
						<Text className="tracking-wide text-lg">
							${(price * nights * 0.13).toFixed(2)} CAD
						</Text>
					</View>
					<HorizontalLine />
					<View className="flex-row justify-between mb-4">
						<Text className="text-xl font-bold">Total(CAD)</Text>
						<Text className="tracking-wide text-lg font-bold">
							${(price * nights * 1.13 + serviceFee + cleaningFee).toFixed(2)}{" "}
							CAD
						</Text>
					</View>
				</View>
				<View className="flex-row justify-center gap-x-4 ">
					<MyButton
						disabled={isPending}
						text="Cancel"
						onPress={() => setShowConfirmBook(false)}
						bgColor="bg-red-500"
						wrapperClassName="w-[45%]"
						textClassName="text-lg"
					/>
					<MyButton
						disabled={isPending}
						spinning={isPending}
						text="Confirm"
						onPress={handleConfirmBooking}
						wrapperClassName="w-[45%]"
						textClassName="text-lg"
					/>
				</View>
			</View>
		</Modal>
	);
}
