import { ProductType } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import DistanceAway from "../home/DistanceAway";
import Carousel from "./Carousel";
import CountryWithFlag from "./CountryWithFlag";
import { FavBtnNotLogin, FavButton } from "./MyButton";
const ProductCard = React.memo(function ProductCard({
	product,
	favList,
}: {
	product: ProductType;
	favList: string[];
}) {
	const { isSignedIn } = useAuth();
	const isFav = favList.includes(product.id);
	const router = useRouter();
	return (
		<View className="border border-slate-200 rounded-xl  overflow-hidden mb-4  max-w-[180px]">
			{/* image */}
			<View>
				<Carousel images={product.image.map(i => i.imageUrl)} />
			</View>
			{/* product info */}
			<Pressable
				onPress={() =>
					router.push({
						pathname: "/products/[id]",
						params: { id: product.id },
					})
				}>
				<View className="my-2">
					<Text
						className="pl-2 font-bold w-[80%]"
						ellipsizeMode="tail"
						numberOfLines={1}>
						{product.name}
					</Text>
					<Text
						className="pl-2 w-[80%] overflow-clip text-gray-600 tracking-wide"
						ellipsizeMode="tail"
						numberOfLines={1}>
						{product.tagline}
					</Text>
					<View>
						{/* distance */}
						<View className="pl-2">
							<DistanceAway latLng={product.latLng} />
						</View>

						<CountryWithFlag country={product.country} />
						<Text className="pl-2">${product.price} per night</Text>
					</View>
				</View>
			</Pressable>
			{/* fav button */}
			<View className="absolute right-2 top-2 bg-gray-400/50 p-2 rounded">
				{isSignedIn ? (
					<FavButton productId={product.id} isFav={isFav} />
				) : (
					<FavBtnNotLogin />
				)}
			</View>
		</View>
	);
});

export default ProductCard;
