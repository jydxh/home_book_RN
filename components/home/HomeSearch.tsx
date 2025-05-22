import { LinearGradient } from "expo-linear-gradient";
import { TextInput, View } from "react-native";
import HomeCategory from "./HomeCategory";
export default function HomeSearch() {
	return (
		<LinearGradient
			colors={["#E5E7EB", "#FAFAFA"]}
			className="border-b border-gray-200 py-4 px-6">
			<View>
				<TextInput
					className="border rounded-full pl-6 text-xl border-gray-300 bg-white"
					placeholder="Start Your Search"
					defaultValue="hello"
				/>
			</View>
			{/* home category list */}
			<HomeCategory />
		</LinearGradient>
	);
}
