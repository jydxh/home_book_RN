import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function BookingBtn({
	dateRange,
	loadingIndicator,
	onPress,
	wrapperClassName,
	textClassName,
	text,
	bgColor,
	disabledClassName,
}: {
	dateRange?: any;
	loadingIndicator?: boolean;
	onPress: () => void;
	wrapperClassName?: string;
	textClassName?: string;
	text: string;
	disabledClassName?: string;
	bgColor?: string;
}) {
	return (
		<TouchableOpacity
			disabled={!dateRange}
			onPress={onPress}
			className={`rounded py-2 flex-row justify-center items-center gap-4 ${wrapperClassName} ${
				!dateRange ? `bg-gray-400 ${disabledClassName ?? ""}` : bgColor
			} `}>
			{/* spinning UI */}
			{loadingIndicator && <ActivityIndicator size={20} color="#6A7282" />}
			<Text className={`text-center font-semibold text-white ${textClassName}`}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}
