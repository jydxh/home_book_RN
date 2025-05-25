import { LinearGradient } from "expo-linear-gradient";
import { TextInput, View } from "react-native";
import HomeCategory from "./HomeCategory";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { debounce } from "lodash";

export default function HomeSearch() {
	const { search, ...restParams } = useLocalSearchParams<{
		search?: string;
		category?: string;
	}>();
	const [input, setInput] = useState(search || "");
	const router = useRouter();

	/* when ever the input value changed, the URL will be updated and trigger the refetching data */

	const updateSearchParamRef = useRef<((value: string) => void) | null>(null);

	/* reason use useEffect to update the ref, is to make sure even when the resetParams changed,
			the debounce function still be updated
	*/
	useEffect(() => {
		updateSearchParamRef.current = debounce((value: string) => {
			router.replace({
				pathname: "/",
				params: {
					search: value,
					...restParams,
				},
			});
		}, 500);

		return () => {
			updateSearchParamRef.current &&
				(updateSearchParamRef.current as any).cancel?.();
		};
	}, [restParams, router]);

	useEffect(() => {
		if (updateSearchParamRef.current) updateSearchParamRef.current(input);
	}, [input]);
	return (
		<LinearGradient
			colors={["#E5E7EB", "#FAFAFA"]}
			style={{
				borderBottomWidth: 1,
				borderBottomColor: "#F3F4F6",
				paddingTop: 20,
				paddingBottom: 10,
				paddingHorizontal: 16,
			}}>
			<View>
				<TextInput
					value={input}
					onChangeText={setInput}
					className="border rounded-full pl-6 text-xl border-gray-300 bg-white"
					placeholder="Start Your Search"
				/>
			</View>
			{/* home category list */}
			<HomeCategory />
		</LinearGradient>
	);
}
