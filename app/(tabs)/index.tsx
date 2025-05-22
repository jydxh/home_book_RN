import { fetchProducts } from "@/api/fetchProducts";
import HomeSearch from "@/components/home/HomeSearch";
import ProductCard from "@/components/ui/ProductCard";
import { ProductType } from "@/constants/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	const searchParams = useLocalSearchParams<{ category?: string }>();
	const [products, setProducts] = useState<ProductType[] | undefined>();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const data = await fetchProducts({ category: searchParams.category });

			setLoading(false);
			if (data) {
				setProducts(data.data.data);
			}
		};
		fetchData();
	}, [searchParams.category]);
	return (
		<SafeAreaView className="flex-1 bg-slate-50 mt-2">
			<View className="mx-auto mt-2 w-full">
				<HomeSearch />
			</View>
			{/* Products list */}
			<View>
				{loading ? (
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
						data={products}
						keyExtractor={item => item.id}
						numColumns={2}
						ListEmptyComponent={() => (
							<Text className="mx-auto my-10 text-xl">No items found</Text>
						)}
						renderItem={({ item }) => <ProductCard product={item} />}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
