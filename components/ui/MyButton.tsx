import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
export default function MyButton({
	wrapperClassName,
	textClassName,
	onPress,
	text,
	disabled = false,
	disabledClassName,
}: {
	wrapperClassName?: string;
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
				disabled ? `bg-gray-400 ${disabledClassName ?? ""}` : "bg-sky-500"
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
}: {
	productId: string;
	isFavDefault: boolean;
}) => {
	const [isFav, setIsFav] = useState(isFavDefault);
	const toggleFavHandler = () => {};
	return (
		<TouchableOpacity onPress={toggleFavHandler}>
			<MaterialIcons
				name="favorite"
				size={20}
				color={isFav ? "#FB2C36" : "#F8FAFC"}
				className="w-5 h-5"
			/>
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
				className="w-5 h-5"
				color="#F8FAFC"
			/>
		</TouchableOpacity>
	);
};
