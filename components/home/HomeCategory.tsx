import { categories } from "@/constants/categories";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
export default function HomeCategory() {
	console.log(categories);
	return (
		<View className="overflow-hidden ">
			<FlatList
				data={categories}
				horizontal
				scrollToOverflowEnabled={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				contentContainerStyle={{ paddingHorizontal: 12 }}
				scrollEnabled
				renderItem={({ item }) => (
					<View className="mr-8 mt-2">
						<TouchableOpacity className="justify-center items-center">
							<Text className="text-gray-400">{item.label}</Text>
							<item.icon color="#D1D5DC" size={40} />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
