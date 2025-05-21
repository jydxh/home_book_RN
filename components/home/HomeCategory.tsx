import { categories } from "@/constants/categories";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
export default function HomeCategory() {
	const [selectedId, setSelectedId] = useState<null | string>();
	const searchParams = useLocalSearchParams<{
		categoryId?: string;
		searchItem?: string;
	}>();
	const router = useRouter();
	useEffect(() => {
		if (searchParams.categoryId) {
			setSelectedId(searchParams.categoryId);
		}
	}, [searchParams.categoryId]);

	const handlePressCateLink = (categoryId: string) => {
		router.push({
			pathname: "/",
			params: { ...searchParams, categoryId },
		});
	};

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
						<TouchableOpacity
							onPress={() => handlePressCateLink(item.id)}
							className="justify-center items-center my-2">
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

			<Link href={{ pathname: "/", params: { categoryId: "10" } }}>
				to category #10
			</Link>
			<Link href={{ pathname: "/", params: { categoryId: "20" } }}>
				to category #20
			</Link>
			<Link href={{ pathname: "/", params: { categoryId: "30" } }}>
				to category #30
			</Link>
			<Link href={{ pathname: "/", params: { categoryId: "40" } }}>
				to category #40
			</Link>
		</View>
	);
}
