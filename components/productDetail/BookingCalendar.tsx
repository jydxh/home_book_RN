import { View, Modal } from "react-native";
import React from "react";
import { Calendar, DateData } from "react-native-calendars";
import MyButton from "../ui/MyButton";
import moment from "moment";
import { generateDisabledRanges } from "@/utils/generateDisabledRanges";
import { MarkedDates } from "react-native-calendars/src/types";
export default function BookingCalendar({
	showModal,
	maxDate,
	minDate,
	setShowModal,
	disabledDateRange,
	markedDates,
	selectedRange,
	setMarkedDates,
	setSelectedRange,
}: {
	showModal: boolean;
	minDate: string;
	maxDate: string;
	setShowModal: (arg: boolean) => void;
	disabledDateRange: { start: string; end: string }[];
	selectedRange: { start: string | null; end: string | null };
	setSelectedRange: React.Dispatch<
		React.SetStateAction<{
			start: string | null;
			end: string | null;
		}>
	>;
	markedDates: MarkedDates;
	setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
}) {
	const isDateInDisabledRange = (dateString: DateData["dateString"]) => {
		const date = moment(dateString);
		return disabledDateRange.some(range => {
			return date.isBetween(range.start, range.end, null, "[]"); // inclusive
		});
	};

	const handleDayPress = (day: DateData) => {
		if (isDateInDisabledRange(day.dateString)) {
			return; // Don't allow selection of disabled dates
		}

		const { start, end } = selectedRange;

		if (!start || (start && end)) {
			// New selection
			const newMarkedDates = {
				...generateDisabledRanges(disabledDateRange),
				[day.dateString]: {
					selected: true,
					startingDay: true,
					endingDay: true,
					color: "#3d85c6",
					textColor: "white",
				},
			};
			setSelectedRange({ start: day.dateString, end: null });
			setMarkedDates(newMarkedDates);
		} else {
			// Complete the range (only if all dates in range are enabled)
			const startDate = moment(start);
			const endDate = moment(day.dateString);
			let validRange = true;
			let current = moment(startDate);

			// Check if any date in the range is disabled
			while (current.isSameOrBefore(endDate)) {
				const dateStr = current.format("YYYY-MM-DD");
				if (isDateInDisabledRange(dateStr)) {
					validRange = false;
					break;
				}
				current.add(1, "day");
			}

			if (validRange) {
				// if the start day same as end end
				if (moment(start).isSame(day.dateString, "day")) {
					return;
				}
				const newRange = generateDateRange(start, day.dateString);
				setSelectedRange({ start, end: day.dateString });
				setMarkedDates({
					...generateDisabledRanges(disabledDateRange),
					...newRange,
				});
			} else {
				alert(
					"The selected range includes disabled dates. Please choose a different range."
				);
			}
		}
	};

	const generateDateRange = (startDate: string, endDate: string) => {
		const range: MarkedDates = {};
		let start = moment(startDate);
		let end = moment(endDate);

		// Swap if needed
		if (start.isAfter(end)) {
			[start, end] = [end, start];
		}

		// Prevent same-day selection
		if (start.isSame(end, "day")) {
			return range;
		}
		let current = moment(start);

		const startStr = start.format("YYYY-MM-DD");
		const endStr = end.format("YYYY-MM-DD");

		while (current.isSameOrBefore(end)) {
			const dateStr = current.format("YYYY-MM-DD");

			range[dateStr] = {
				selected: true,
				color: "#3d85c6",
				textColor: "white",
				...(dateStr === startStr && { startingDay: true }),
				...(dateStr === endStr && { endingDay: true }),
				...(dateStr !== startStr && dateStr !== endStr && { color: "#9fc5e8" }),
			};
			current.add(1, "day");
		}
		console.log("range:", range);
		return range;
	};

	const handleConfirm = () => {
		console.log("selectedRange:", selectedRange);
		setShowModal(false);
	};

	return (
		<Modal visible={showModal} animationType="fade" transparent={true}>
			<View className="flex-1 justify-center">
				<View className="bg-white pb-4">
					<Calendar
						current={moment().format("YYYY-MM-DD")}
						minDate={minDate}
						maxDate={maxDate}
						onDayPress={day => handleDayPress(day)}
						markedDates={markedDates}
						markingType="period"
						theme={{
							calendarBackground: "#ffffff",
							textSectionTitleColor: "#b6c1cd",
							selectedDayBackgroundColor: "#3d85c6",
							selectedDayTextColor: "#ffffff",
							todayTextColor: "#3d85c6",
							dayTextColor: "#2d4150",
							textDisabledColor: "#d9e1e8",
							disabledArrowColor: "#d9e1e8",
						}}
					/>
					<View className="flex-row gap-x-2 justify-center  ">
						<MyButton
							text="Cancel"
							onPress={() => {
								setMarkedDates(generateDisabledRanges(disabledDateRange)); // reset to default markedDate
								setShowModal(false);
								setSelectedRange({ start: null, end: null });
							}}
							wrapperClassName="w-20"
							bgColor="bg-red-400"
						/>
						<MyButton
							disabled={!selectedRange.end || !selectedRange.start}
							text="Confirm"
							onPress={handleConfirm}
							wrapperClassName="w-20"
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}
