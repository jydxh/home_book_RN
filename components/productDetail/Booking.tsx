import { View, Text, Modal } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { type Booking } from "@/constants/types";
// import DateTimePicker, {
// 	DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import BookingBtn from "./BookingBtn";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import MyButton from "../ui/MyButton";
import { useState } from "react";
import moment from "moment";
import BookingCalendar from "./BookingCalendar";
import { generateDisabledRanges } from "@/utils/generateDisabledRanges";

export default function BookingComponent({
	bookings,
	image,
	price,
	productId,
	rating,
	totalReview,
	disabledDateRange,
}: {
	productId: string;
	price: number;
	bookings: Booking[];
	totalReview: number;
	rating: number;
	image: string;
	disabledDateRange: { start: string; end: string }[];
}) {
	const { isSignedIn } = useAuth();
	const [selectedRange, setSelectedRange] = useState<{
		start: string | null;
		end: string | null;
	}>({
		start: null,
		end: null,
	});
	const [showCalendar, setShowCalendar] = useState(false);
	/* this range will get from parent later, now just use fixed value */

	const [markedDates, setMarkedDates] = useState(
		generateDisabledRanges(disabledDateRange)
	);

	const router = useRouter();

	let maxDate: Date | string = new Date();
	maxDate.setMonth(maxDate.getMonth() + 3);
	maxDate = maxDate.toISOString().split("T")[0];
	const minDate = new Date().toISOString().split("T")[0];

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

			<BookingCalendar
				maxDate={maxDate}
				minDate={minDate}
				showModal={showCalendar}
				setShowModal={setShowCalendar}
				disabledDateRange={disabledDateRange}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
				markedDates={markedDates}
				setMarkedDates={setMarkedDates}
			/>

			<View className="my-2 gap-y-2">
				<MyButton
					text={
						selectedRange.start && selectedRange.end
							? `From: ${selectedRange.start} -- To: ${selectedRange.end}`
							: "pick a date range"
					}
					onPress={() => setShowCalendar(true)}
				/>

				<BookingBtn
					disabled={!!selectedRange.start && !!selectedRange.end}
					onPress={handlePressBooking}
					dateRange={false}
					text="Booking the Date"
					bgColor="bg-red-400"
				/>
			</View>
		</View>
	);
}
