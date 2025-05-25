import { useFetchFavList, useFetchProducts } from "@/api/fetchProducts";
import HomeSearch from "@/components/home/HomeSearch";
import ProductCard from "@/components/ui/ProductCard";
import { ProductType } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	const searchParams = useLocalSearchParams<{
		category?: string;
		search?: string;
	}>();
	// console.log("searchParams:", searchParams);
	const { isSignedIn, isLoaded } = useAuth();
	const {
		data: products,
		isLoading,
		isError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useFetchProducts({
		category: searchParams.category,
		search: searchParams.search,
	});

	const {
		data: favList,
		isLoading: favListLoading,
		isError: favListError,
	} = useFetchFavList();

	const flatData = products?.pages.flatMap(page => page?.data.data) ?? [];

	const renderProductCard = useCallback(
		({ item }: { item: ProductType }) => (
			<ProductCard
				product={item}
				favList={favList || []}
				favListLoading={favListLoading}
			/>
		),
		[favList, favListLoading]
	);

	if (isLoaded)
		return (
			<SafeAreaView className="flex-1 bg-slate-50">
				<View className="mx-auto w-full">
					<HomeSearch />
				</View>

				{isError || favListError ? (
					<Text className="mx-auto mt-4 text-xl">Error in fetching data</Text>
				) : (
					<View>
						{/* only when user isSignedIn and will verify favListLoading */}
						{isLoading || (isSignedIn && favListLoading) ? (
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
								data={flatData}
								keyExtractor={item => item.id}
								numColumns={2}
								ListEmptyComponent={() => (
									<Text className="mx-auto my-10 text-xl">No items found</Text>
								)}
								renderItem={renderProductCard}
								onEndReached={() => {
									if (hasNextPage && !isFetchingNextPage) {
										fetchNextPage();
									}
								}}
								onEndReachedThreshold={0.5}
								ListFooterComponent={
									isFetchingNextPage ? (
										<ActivityIndicator size="small" color="#FF6467" />
									) : null
								}
							/>
						)}
					</View>
				)}
			</SafeAreaView>
		);
}
