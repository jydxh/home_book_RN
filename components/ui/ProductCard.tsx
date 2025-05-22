import { ProductType } from "@/constants/types";
import countries from "i18n-iso-countries";
import { Image, Text, View } from "react-native";
import DistanceAway from "../home/DistanceAway";

export default function ProductCard({ product }: { product: ProductType }) {
	countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
	return (
		<View className="border border-slate-200 rounded-xl  overflow-hidden mb-4  max-w-[180px]">
			{/* image */}
			<View>
				{/* later this image this be carousel */}
				<Image
					source={{ uri: product.image[0].imageUrl }}
					className="w-[180px] h-[120px]"
				/>
			</View>
			{/* product info */}
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
						<Text className="text-clip " ellipsizeMode="tail" numberOfLines={1}>
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
		</View>
	);
}
