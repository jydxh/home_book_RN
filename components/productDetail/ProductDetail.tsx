import { Property } from "@/constants/types";
import React from "react";
import { View, Dimensions, Text, Image } from "react-native";
import Carousel from "../ui/Carousel";
import HorizontalLine from "../ui/HorizontalLine";
import CountryWithFlag from "../ui/CountryWithFlag";
import { FavButton } from "../ui/MyButton";
import calculateYearDiff from "@/utils/calculateYearDiff";
import ProductDescription from "./ProductDescription";

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
				{/* room info */}
				<Text className="mt-2 ml-2 text-lg">
					{product.bedrooms} bedroom{product.bedrooms > 1 && "s"} &middot;{" "}
					{product.guests} guest{product.guests > 1 && "s"} &middot;{" "}
					{product.baths} bath {product.baths > 1 && "s"}
				</Text>
				{/* host info */}
				<View className="flex-row justify-start gap-x-4 mt-4">
					<Image
						source={{ uri: product.user.profileImage }}
						width={55}
						height={55}
						className="rounded-full ml-2"
					/>
					<View className="justify-center gap-y-1">
						<Text className="text-lg font-semibold">
							Hosted by {product.user.userName}
						</Text>
						<Text className="text-lg font-light">
							SuperHost &middot; {calculateYearDiff(product.user.createAt)}{" "}
							hosting
						</Text>
					</View>
				</View>
				<HorizontalLine />
				{/* product description */}
				<ProductDescription description={product.description} />
			</View>

			{/*below to be deleted once finish this page */}
			<HorizontalLine />
			<HorizontalLine />
			<HorizontalLine />
			<HorizontalLine />
			<Text>{JSON.stringify(product, null, 2)}</Text>
		</>
	);
}

export default ProductDetail;
