import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function BookingBtn({
	loadingIndicator,
	onPress,
	wrapperClassName,
	textClassName,
	text,
	bgColor,
	disabledClassName,
	disabled,
}: {
	loadingIndicator?: boolean;
	onPress: () => void;
	wrapperClassName?: string;
	textClassName?: string;
	text: string;
	disabledClassName?: string;
	bgColor?: string;
	disabled: boolean;
}) {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			className={`rounded py-2 flex-row justify-center items-center gap-4 ${wrapperClassName} ${
				disabled ? `bg-gray-400 ${disabledClassName ?? ""}` : bgColor
			} `}>
			{/* spinning UI */}
			{loadingIndicator && <ActivityIndicator size={20} color="#6A7282" />}
			<Text className={`text-center font-semibold text-white ${textClassName}`}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}
