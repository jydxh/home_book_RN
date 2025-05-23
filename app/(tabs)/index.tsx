import { useFetchFavList, useFetchProducts } from "@/api/fetchProducts";
import HomeSearch from "@/components/home/HomeSearch";
import ProductCard from "@/components/ui/ProductCard";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	const searchParams = useLocalSearchParams<{ category?: string }>();

	const [favList, setFavList] = useState<string[] | null>(null);
	const {
		data: products,
		isLoading,
		isError,
	} = useFetchProducts({
		category: searchParams.category,
	});

	useFetchFavList(setFavList);

	if (isError) return <Text>Error in fetching data</Text>;

	return (
		<SafeAreaView className="flex-1 bg-slate-50 mt-2">
			<View className="mx-auto mt-2 w-full">
				<HomeSearch />
			</View>
			{/* Products list */}
			<View>
				{isLoading ? (
					<ActivityIndicator
						size="large"
						color="#FF6467"
						className="mt-20 justify-center items-center"
					/>
				) : (
					<FlatList
						showsVerticalScrollIndicator={false}
						columnWrapperClassName="mx-auto gap-4"
						contentContainerStyle={{
							paddingBottom: 150,
						}}
						data={products?.data.data}
						keyExtractor={item => item.id}
						numColumns={2}
						ListEmptyComponent={() => (
							<Text className="mx-auto my-10 text-xl">No items found</Text>
						)}
						renderItem={({ item }) => (
							<ProductCard product={item} favList={favList || []} />
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
