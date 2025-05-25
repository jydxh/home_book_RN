import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
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
	isFavDefault,
	favListLoading,
}: {
	productId: string;
	isFavDefault: boolean;
	favListLoading: boolean;
}) => {
	const [isFav, setIsFav] = useState(isFavDefault);
	const toggleFavHandler = () => {};
	return (
		<TouchableOpacity onPress={toggleFavHandler}>
			{favListLoading ? (
				<ActivityIndicator size={20} color="#6A7282" />
			) : (
				<MaterialIcons
					name="favorite"
					size={20}
					color={isFav ? "#FB2C36" : "#F8FAFC"}
					className="w-6 h-6"
				/>
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
