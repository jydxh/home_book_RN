import { useToggleFavButton } from "@/api/productsApi";
import { useAuth } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
export default function MyButton({
	wrapperClassName,
	textClassName,
	bgColor = "bg-sky-500",
	onPress,
	text,
	disabled = false,
	disabledClassName,
}: {
	wrapperClassName?: string;
	bgColor?: string;
	textClassName?: string;
	onPress?: () => void;
	text: string;
	disabled?: boolean;
	disabledClassName?: string;
}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			className={`rounded py-2 flex-row justify-center items-center gap-4 ${wrapperClassName} ${
				disabled ? `bg-gray-400 ${disabledClassName ?? ""}` : bgColor
			} `}>
			{/* spinning UI */}
			{disabled && <ActivityIndicator size={20} color="#6A7282" />}
			<Text className={`text-center font-semibold text-white ${textClassName}`}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}

export const FavButton = ({
	productId,
	isFav,
	withText = false,
}: {
	productId: string;
	isFav: boolean;
	withText?: boolean;
}) => {
	const { getToken } = useAuth();

	const { mutate: toggleFav, isPending } = useToggleFavButton();

	const toggleFavHandler = async () => {
		const token = await getToken();

		toggleFav({ productId, token });

		Toast.show({
			text1Style: { fontSize: 14 },
			bottomOffset: 120,
			type: "success",
			text1: `Successfully ${
				isFav ? "Removed from" : "Added to"
			}  favourite list`,
			position: "bottom",
		});
	};

	return (
		<TouchableOpacity
			onPress={toggleFavHandler}
			disabled={isPending}
			className="flex-row gap-x-2 items-center">
			<MaterialIcons
				name="favorite"
				size={20}
				color={isFav ? "#FB2C36" : "#F8FAFC"}
				className="w-6 h-6"
			/>
			{withText && (
				<Text className="underline text-xl">
					{isFav ? "Remove from List" : "Add to List"}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export const FavBtnNotLogin = () => {
	const router = useRouter();
	return (
		<TouchableOpacity onPress={() => router.push("/login")}>
			<MaterialIcons
				name="favorite"
				size={20}
				className="w-6 h-6"
				color="#F8FAFC"
			/>
		</TouchableOpacity>
	);
};
