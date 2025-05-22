import { fetchProducts } from "@/api/fetchProducts";
import HomeSearch from "@/components/home/HomeSearch";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	const [products, setProducts] = useState<any>();
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchProducts();
			console.log("data:", JSON.stringify(data, null, 2));
			if (data) {
				setProducts(data.data);
			}
		};
		fetchData();
	}, []);
	return (
		<SafeAreaView className="flex-1 bg-slate-50 mt-2">
			<View className="mx-auto mt-2 w-full">
				<HomeSearch />
			</View>
		</SafeAreaView>
	);
}
