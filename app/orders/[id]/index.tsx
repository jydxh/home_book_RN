import { useCancelOrder, useFetchOrderById } from "@/api/productsApi";
import HorizontalLine from "@/components/ui/HorizontalLine";
import MyButton from "@/components/ui/MyButton";
import OrderStatusComponent from "@/components/ui/OrderStatus";
import { useLocalSearchParams, useRouter } from "expo-router";
import countries from "i18n-iso-countries";
import moment from "moment";
import React from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.8;
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const TextLine = ({
	label,
	text,
	children,
}: {
	label: string;
	text?: string;
	children?: React.ReactNode;
}) => {
	return (
		<View className="flex-row flex-wrap gap-x-2 items-center">
			<Text className="font-bold text-lg">{label}: </Text>
			{text && <Text>{text}</Text>}
			{children}
		</View>
	);
};

const PriceLine = ({ label, price }: { label: string; price: number }) => {
	return (
		<View className="flex-row justify-between items-center">
			<Text className="underline text-lg">{label}</Text>
			<Text className="text-lg">${price.toFixed(2)} CAD</Text>
		</View>
	);
};

export default function OrderDetailPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data, isLoading } = useFetchOrderById(id);
	const router = useRouter();
	const onSuccess = () => {
		Toast.show({
			type: "success",
			text1: "Cancelled",
			text1Style: { fontSize: 16 },
			position: "bottom",
		});
		router.replace("/myOrder");
	};
	const onError = () => {
		Toast.show({
			type: "error",
			text1: "Failed in Cancel Order",
			text1Style: { fontSize: 16 },
			position: "bottom",
		});
	};
	const { mutate, isPending } = useCancelOrder({
		orderId: id,
		onError,
		onSuccess,
	});
	const handleCancel = () => {
		mutate();
	};
	if (isLoading)
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<ActivityIndicator size={"large"} color="#FF6467" />
			</SafeAreaView>
		);

	if (data)
		return (
			<SafeAreaView className="-mt-8">
				<ScrollView className="mb-4">
					<View className="flex-1 mx-4 p-6 border rounded-xl border-gray-300">
						<View className="gap-y-2">
							<TextLine label="Order ID" text={data.orderDetail.id} />
							<TextLine
								label="Order Date"
								text={moment(data.orderDetail.createdAt).format("MMMM D, YYYY")}
							/>
							<TextLine label="Payment Status">
								<Text
									className={`${
										data.orderDetail.paymentStatus
											? "text-green-600 bg-green-200/60 "
											: " text-orange-500 bg-orange-200/60 "
									} font-medium  p-2  rounded-xl capitalize`}>
									{data.orderDetail.paymentStatus ? "success" : "pending"}
								</Text>
							</TextLine>
							<TextLine label="Order Status">
								<OrderStatusComponent
									orderStatus={data.orderDetail.orderStatus}
								/>
							</TextLine>
						</View>
						<HorizontalLine />
						{/* property info */}
						<View className="mx-auto mb-4">
							<Image
								source={{ uri: data.orderDetail.property.image[0].imageUrl }}
								width={imageWidth}
								height={240}
								className="rounded-lg"
								resizeMode="cover"
							/>
						</View>

						<View className="gap-y-2">
							<TextLine
								text={data.orderDetail.property.name}
								label="Rental Name"
							/>
							<TextLine
								text={data.orderDetail.property.address}
								label="Rental Address"
							/>
							<TextLine
								text={countries.getName(
									data.orderDetail.property.country,
									"en",
									{ select: "alias" }
								)}
								label="Rental Country"
							/>
							<TextLine
								text={moment(data.orderDetail.checkIn).format("MMMM D, YYYY")}
								label="Check In Date"
							/>
							<TextLine
								text={moment(data.orderDetail.checkOut).format("MMMM D, YYYY")}
								label="Check Out Date"
							/>
							<TextLine
								text={data.orderDetail.totalNight.toString()}
								label="Total night(s)"
							/>
						</View>

						<HorizontalLine />
						{/* price detail */}
						<View className="gap-y-2">
							<Text className="font-bold text-lg mb-2">Price Details</Text>
							<View className="flex-row justify-between items-center">
								<Text className="text-lg">
									${data.orderDetail.property.price} CAD x{" "}
									{data.orderDetail.totalNight} night
									{data.orderDetail.totalNight && "s"}
								</Text>
								<Text className="text-lg">
									$
									{(
										data.orderDetail.property.price *
										data.orderDetail.totalNight
									).toFixed(2)}{" "}
									CAD
								</Text>
							</View>
							<PriceLine label="Cleaning Fee" price={100} />
							<PriceLine label="Service Fee" price={200} />
							<PriceLine
								label="Tax"
								price={Math.round(
									0.13 *
										data.orderDetail.property.price *
										data.orderDetail.totalNight
								)}
							/>
						</View>

						<HorizontalLine />
						{/* Total price */}
						<View className="flex-row items-center justify-between">
							<Text className="text-2xl font-bold">Total(CAD)</Text>
							<Text className="text-2xl font-bold">
								{new Intl.NumberFormat("en-CA", {
									style: "currency",
									currency: "CAD",
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}).format(data.orderDetail.orderTotal)}{" "}
								CAD
							</Text>
						</View>
						<HorizontalLine />
						{/* Actions */}
						<View className="flex-row justify-between">
							<MyButton
								text="Back to Order Lists"
								wrapperClassName="p-2"
								onPress={() => router.back()}
							/>
							{data.orderDetail.orderStatus === "PENDING" &&
								moment(data.orderDetail.checkIn)
									.subtract(2, "days")
									.isAfter(moment()) && (
									<MyButton
										disabled={isPending}
										spinning={isPending}
										text="Cancel the Order"
										wrapperClassName="p-2"
										bgColor="bg-red-500"
										onPress={handleCancel}
									/>
								)}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
}
