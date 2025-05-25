import { ProductType } from "@/constants/types";
import { useAuth } from "@clerk/clerk-expo";
import countries from "i18n-iso-countries";
import { Image, Pressable, Text, View } from "react-native";
import DistanceAway from "../home/DistanceAway";
import { FavBtnNotLogin, FavButton } from "./MyButton";
import Carousel from "./Carousel";
import React from "react";
import { useRouter } from "expo-router";

const ProductCard = React.memo(function ProductCard({
	product,
	favList,
	favListLoading,
}: {
	product: ProductType;
	favList: string[];
	favListLoading: boolean;
}) {
	countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
	const { isSignedIn } = useAuth();
	const isFav = favList.includes(product.id);
	const router = useRouter();
	return (
		<View className="border border-slate-200 rounded-xl  overflow-hidden mb-4  max-w-[180px]">
			{/* image */}
			<View>
				{/* <Image
					source={{ uri: product.image[0].imageUrl }}
					className="w-[180px] h-[120px]"
				/> */}
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

						<View className="justify-between flex-row px-2">
							<Text
								className="text-clip "
								ellipsizeMode="tail"
								numberOfLines={1}>
								{countries.getName(product.country, "en", { select: "alias" })}
							</Text>
							<Image
								style={{ width: 24, height: 16, marginLeft: 4 }}
								source={{
									uri: `https://flagcdn.com/24x18/${product.country.toLowerCase()}.png`,
								}}
							/>
						</View>
						<Text className="pl-2">${product.price} per night</Text>
					</View>
				</View>
			</Pressable>
			{/* fav button */}
			<View className="absolute right-2 top-2 bg-gray-400/50 p-2 rounded">
				{isSignedIn ? (
					<FavButton
						productId={product.id}
						isFav={isFav}
						favListLoading={favListLoading}
					/>
				) : (
					<FavBtnNotLogin />
				)}
			</View>
		</View>
	);
});

export default ProductCard;
