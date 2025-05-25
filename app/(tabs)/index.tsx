import { useFetchFavList, useFetchProducts } from "@/api/fetchProducts";
import HomeSearch from "@/components/home/HomeSearch";
import ProductCard from "@/components/ui/ProductCard";
import { useLocalSearchParams } from "expo-router";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	const searchParams = useLocalSearchParams<{ category?: string }>();

	const {
		data: products,
		isLoading,
		isError,
	} = useFetchProducts({
		category: searchParams.category,
	});

	const {
		data: favList,
		isLoading: favListLoading,
		isError: favListError,
	} = useFetchFavList();

	return (
		<SafeAreaView className="flex-1 bg-slate-50">
			<View className="mx-auto w-full">
				<HomeSearch />
			</View>

			{isError || favListError ? (
				<Text className="mx-auto mt-4 text-xl">Error in fetching data</Text>
			) : (
				<View>
					{isLoading ? (
						<ActivityIndicator
							size="large"
							color="#FF6467"
							className="mt-20 justify-center items-center"
						/>
					) : (
						/* Products list */
						<FlatList
							className="mt-2"
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
								<ProductCard
									product={item}
									favList={favList || []}
									favListLoading={favListLoading}
								/>
							)}
						/>
					)}
				</View>
			)}
		</SafeAreaView>
	);
}
