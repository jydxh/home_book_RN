import HomeSearch from "@/components/home/HomeSearch";
import { View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	return (
		<SafeAreaView className="flex-1 bg-slate-50 mt-2">
			<View className="mx-auto mt-2 w-full">
				<HomeSearch />
			</View>
		</SafeAreaView>
	);
}
