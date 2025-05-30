import { useState } from "react";
import { View, Text } from "react-native";
import MyButton from "../ui/MyButton";

const wordLimit = 400;

/*1. when words are over 100 chars => slice the words, and show the show more button => when user click the button, show all the content, and change the ShowMore to showLess  */
/* 2. IF the words are less than 100, just show the whole paragraph, no need to show any button */
function ProductDescription({ description }: { description: string }) {
	const [isShowMore, setIsShowMore] = useState(false);

	const isMoreChars = description.length > wordLimit;
	return (
		<View className="mt-4">
			<Text className="font-semibold text-xl">Description:</Text>
			<Text className="mt-4 text-lg  leading-8 tracking-wide">
				{isMoreChars && !isShowMore
					? description.substring(0, wordLimit) + "..."
					: description}
			</Text>
			{isMoreChars && (
				<MyButton
					bgColor="transparent"
					textClassName="text-lg underline"
					textColorClass="text-red-500"
					wrapperClassName="mx-auto block mt-2 px-2 py-1"
					onPress={() => setIsShowMore(prev => !prev)}
					text={isShowMore ? "Show Less" : "Show More"}
				/>
			)}
		</View>
	);
}
export default ProductDescription;
