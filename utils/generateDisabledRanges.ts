import moment from "moment";
import { MarkedDates } from "react-native-calendars/src/types";
export const generateDisabledRanges = (
	disabledRanges: { start: string; end: string }[]
) => {
	const marked: MarkedDates = {};

	disabledRanges.forEach(range => {
		let current = moment(range.start);
		const end = moment(range.end);

		while (current.isSameOrBefore(end)) {
			const dateStr = current.format("YYYY-MM-DD");
			marked[dateStr] = {
				disabled: true,
				disableTouchEvent: true,
				customStyles: {
					container: {
						backgroundColor: "#f0f0f0",
						borderRadius: 0,
					},
					text: {
						color: "#d3d3d3",
						textDecorationLine: "line-through",
					},
				},
			};
			current.add(1, "day");
		}
	});

	return marked;
};
