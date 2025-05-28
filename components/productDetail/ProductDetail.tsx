import { Property } from "@/constants/types";
import React from "react";
import { View, Dimensions, Text } from "react-native";
import Carousel from "../ui/Carousel";
import HorizontalLine from "../ui/HorizontalLine";
import CountryWithFlag from "../ui/CountryWithFlag";
import { FavButton } from "../ui/MyButton";

const { width } = Dimensions.get("window");

function ProductDetail({
	product,
	isFav,
}: {
	product: Property;
	isFav: boolean;
}) {
	return (
		<>
			<View className="mt-8 ml-4">
				<FavButton productId={product.id} isFav={isFav} withText={true} />
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
			<Text>{JSON.stringify(product, null, 2)}</Text>
		</>
	);
}

export default ProductDetail;
