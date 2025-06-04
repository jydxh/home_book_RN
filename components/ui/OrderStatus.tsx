import { OrderStatus } from "@/constants/types";
import React from "react";
import { Text } from "react-native";

export default function OrderStatusComponent({
	orderStatus,
}: {
	orderStatus: OrderStatus;
}) {
	return (
		<Text
			className={`${
				orderStatus === "CHECKED"
					? "text-green-500 bg-green-300/50"
					: orderStatus === "CANCELED"
					? "text-red-500 bg-red-300/50"
					: orderStatus === "PENDING"
					? "text-yellow-500 bg-yellow-300/40"
					: ""
			}  capitalize font-medium p-2 rounded-xl`}>
			{orderStatus.toLowerCase()}
		</Text>
	);
}
