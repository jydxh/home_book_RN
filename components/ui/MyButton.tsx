import { Text, TouchableOpacity } from "react-native";
import LoadingCircle from "./LoadingCircle";
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
			{disabled && <LoadingCircle size={20} color="#6A7282" />}
			<Text className={`text-center font-semibold text-white ${textClassName}`}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}
