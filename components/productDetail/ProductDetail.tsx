import { Property } from "@/constants/types";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "../ui/Carousel";
import HorizontalLine from "../ui/HorizontalLine";
import CountryWithFlag from "../ui/CountryWithFlag";

const { width } = Dimensions.get("window");

function ProductDetail({ product }: { product: Property }) {
	return (
		<>
			<View className="mx-auto mt-8">
				<Text className="text-2xl font-semibold">{product.name}</Text>
			</View>
			<HorizontalLine />
			{/* carousel */}
			<View className="mx-4 rounded-lg overflow-hidden">
				<Carousel
					images={product.image.map(i => i.imageUrl)}
					flatListStyle={{ width, height: 300 }}
					imageStyle={{ width, height: 300 }}
				/>
			</View>
			<HorizontalLine />
			{/* country and flag */}
			<View className="px-2">
				<CountryWithFlag
					spaceBetween={false}
					country={product.country}
					textClassName="text-xl font-semibold"
					imageStyle={{ width: 30, height: 20 }}
				/>
			</View>
		</>
	);
}

export default ProductDetail;
