import { View, Text } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { type Booking } from "@/constants/types";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BookingBtn from "./BookingBtn";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import MyButton from "../ui/MyButton";
import { useState } from "react";
import moment from "moment";

export default function BookingComponent({
	bookings,
	image,
	price,
	productId,
	rating,
	totalReview,
}: {
	productId: string;
	price: number;
	bookings: Booking[];
	totalReview: number;
	rating: number;
	image: string;
}) {
	const { isSignedIn } = useAuth();
	const [showStartDate, setShowStartDate] = useState(false);
	const [showEndDate, setShowEndDate] = useState(false);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const router = useRouter();

	const maxDate = new Date();
	maxDate.setMonth(maxDate.getMonth() + 3);

	const onDatePickerChange = (
		_event: DateTimePickerEvent,
		selectedDate: Date | undefined,
		mode: "start" | "end"
	) => {
		if (_event.type === "dismissed") {
			if (mode === "start") setShowStartDate(false);
			if (mode === "end") setShowEndDate(false);
			return;
		}
		if (selectedDate) {
			const currentDate = selectedDate;
			if (mode === "start") {
				setShowStartDate(false);
				setStartDate(currentDate);
			}
			if (mode === "end") {
				setShowEndDate(false);
				setEndDate(currentDate);
			}
		}
	};

	const handlePressBooking = () => {
		if (!isSignedIn) return router.push("/login");
		console.log("opening the confirm modal");
	};
	return (
		<View
			className="border rounded-xl border-gray-500/40 p-4 bg-gray-300/90"
			style={{
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.15,
				shadowRadius: 6,
				elevation: 5,
			}}>
			<View className="justify-center items-center flex-row gap-x-4">
				<FontAwesome5 name="hotjar" size={32} color="#E7000B" />
				<Text className="text-red-600 text-4xl font-bold">Booking Now!</Text>
			</View>
			<Text className="text-xl font-semibold mt-4 ml-4">
				${price} per night
			</Text>
			<Text className="text-xl mt-4 ml-4">
				Pick up a start date and end date
			</Text>
			{/* date picker */}
			{showStartDate && (
				<DateTimePicker
					onTouchCancel={() => setStartDate(null)}
					maximumDate={maxDate}
					minimumDate={new Date()}
					value={startDate ?? new Date()}
					mode={"date"}
					onChange={(event, selectedDate) =>
						onDatePickerChange(event, selectedDate, "start")
					}
				/>
			)}
			{showEndDate && (
				<DateTimePicker
					onTouchCancel={() => setStartDate(null)}
					maximumDate={maxDate}
					minimumDate={startDate ?? new Date()}
					value={endDate ?? new Date()}
					mode={"date"}
					onChange={(event, selectedDate) =>
						onDatePickerChange(event, selectedDate, "end")
					}
				/>
			)}
			<View className="my-2 gap-y-2">
				<MyButton
					text={`📅 Start Date:  ${
						startDate ? moment(startDate).format("MMM D, YYYY") : "--"
					}`}
					onPress={() => setShowStartDate(true)}
				/>
				<MyButton
					disabled={!startDate}
					text={`📅 End Date:  ${
						endDate ? moment(endDate).format("MMM D, YYYY") : "--"
					}`}
					onPress={() => setShowEndDate(true)}
				/>

				<BookingBtn
					onPress={handlePressBooking}
					dateRange={true}
					text="Booking the Date"
					bgColor="bg-red-400"
				/>
			</View>
		</View>
	);
}
