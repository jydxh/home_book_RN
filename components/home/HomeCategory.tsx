import { categories } from "@/constants/categories";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
export default function HomeCategory() {
	const [selectedId, setSelectedId] = useState<null | string>();
	const searchParams = useLocalSearchParams<{
		category?: string;
		searchItem?: string;
	}>();
	const router = useRouter();
	const { category: categoryParam, ...resetParams } = searchParams;
	useEffect(() => {
		if (searchParams.category) {
			setSelectedId(searchParams.category);
		}
	}, [searchParams.category]);

	const handlePressCateLink = (category: string) => {
		if (category === categoryParam) {
			setSelectedId(null);
			router.push({ pathname: "/", params: resetParams });
		} else {
			router.push({
				pathname: "/",
				params: { ...searchParams, category },
			});
		}
	};

	return (
		<View className="overflow-hidden">
			<FlatList
				data={categories}
				horizontal
				scrollToOverflowEnabled={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				contentContainerStyle={{ paddingHorizontal: 2 }}
				scrollEnabled
				renderItem={({ item }) => (
					<View className="mr-8 mt-2">
						<TouchableOpacity
							onPress={() => handlePressCateLink(item.id)}
							className="justify-center items-center mt-2">
							<Text
								className={`${
									selectedId === item.id ? "text-red-400" : "text-gray-500"
								} font-bold text-lg `}>
								{item.label}
							</Text>
							<item.icon
								color={`${selectedId === item.id ? "#FF6467" : "#D1D5DC"}`}
								size={40}
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
