import { Text, View } from "react-native";

import { type Booking } from "@/constants/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import DateTimePicker, {
// 	DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
import { generateDisabledRanges } from "@/utils/generateDisabledRanges";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import MyButton from "../ui/MyButton";
import BookingBtn from "./BookingBtn";
import BookingCalendar from "./BookingCalendar";
import ConfirmBook from "./ConfirmBook";

export default function BookingComponent({
	bookings,
	image,
	price,
	productId,
	rate,
	totalReview,
	name,
	disabledDateRange,
}: {
	productId: string;
	price: number;
	bookings: Booking[];
	totalReview: number;
	rate: {
		rating: string;
		count: number;
	};
	image: string;
	name: string;
	disabledDateRange: { start: string; end: string }[];
}) {
	//console.log("disabledDateRange", disabledDateRange);
	const { isSignedIn } = useAuth();
	const [selectedRange, setSelectedRange] = useState<{
		start: string | null;
		end: string | null;
	}>({
		start: null,
		end: null,
	});
	const [showCalendar, setShowCalendar] = useState(false);
	const [showConfirmBook, setShowConfirmBook] = useState(false);

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
		setShowConfirmBook(true);
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
			<ConfirmBook
				setShowConfirmBook={setShowConfirmBook}
				showConfirmBook={showConfirmBook}
				imageUrl={image}
				price={price}
				propertyName={name}
				rate={rate}
				selectedRange={selectedRange}
				productId={productId}
			/>

			<View className="my-2 gap-y-2">
				<MyButton
					text={
						selectedRange.start && selectedRange.end
							? `From: ${selectedRange.start}   To: ${selectedRange.end}`
							: "Pick a date range"
					}
					onPress={() => setShowCalendar(true)}
				/>

				<BookingBtn
					disabled={!selectedRange.start || !selectedRange.end}
					onPress={handlePressBooking}
					text="Booking the Date"
					bgColor="bg-red-400"
				/>
			</View>
		</View>
	);
}
