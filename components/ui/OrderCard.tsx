import { OrderStatus } from "@/constants/types";
import { useRouter } from "expo-router";
import moment from "moment";
import { Image, Text, TouchableOpacity, View } from "react-native";
import OrderStatusComponent from "./OrderStatus";

export default function OrderCard({
	orderId,
	checkIn,
	checkOut,
	createdDate,
	image,
	orderStatus,
	productName,
	totalNight,
}: {
	orderId: string;
	image: string;
	productName: string;
	checkIn: Date;
	checkOut: Date;
	createdDate: Date;
	totalNight: number;
	orderStatus: OrderStatus;
}) {
	const router = useRouter();
	return (
		<View className="flex-1 border rounded-lg border-gray-400/50 w-full overflow-hidden bg-gray-200">
			<TouchableOpacity onPress={() => router.replace(`/orders/${orderId}`)}>
				<Image
					style={{ width: "100%", height: 250 }}
					source={{ uri: image }}
					className="w-full"
					resizeMode="cover"
				/>
				<View className="items-center my-4 gap-y-2">
					<Text className="font-semibold text-2xl">{productName}</Text>
					<Text className="text-lg">
						Check in: {moment(checkIn).format("MMMM DD, YYYY")}
					</Text>
					<Text className="text-lg">
						Check out:{moment(checkOut).format("MMMM DD, YYYY")}{" "}
					</Text>
					<Text className="text-lg">
						Ordered at: {moment(createdDate).format("MMMM DD, YYYY")}
					</Text>
					<Text className="text-lg">
						Total night: {totalNight} night{totalNight > 1 ? "s" : ""}
					</Text>
					<View className="flex-row gap-4 items-center">
						<Text className="text-lg">Order Status:</Text>
						<OrderStatusComponent orderStatus={orderStatus} />
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
