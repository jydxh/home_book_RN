import { View, Text, Image, StyleProp, ImageStyle } from "react-native";
import React from "react";
import countries from "i18n-iso-countries";
export default function CountryWithFlag({
	country,
	textClassName,
	imageStyle,
	spaceBetween = true,
}: {
	country: string;
	textClassName?: string;
	imageStyle?: StyleProp<ImageStyle>;
	spaceBetween?: boolean;
}) {
	countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
	return (
		<View
			className={`${
				spaceBetween ? "justify-between" : "justify-start"
			}  items-center gap-x-4 flex-row px-2`}>
			<Text
				className={`text-clip ${textClassName}`}
				ellipsizeMode="tail"
				numberOfLines={1}>
				{countries.getName(country, "en", { select: "alias" })}
			</Text>
			<Image
				style={[{ width: 24, height: 16, marginLeft: 4 }, imageStyle]}
				source={{
					uri: `https://flagcdn.com/24x18/${country.toLowerCase()}.png`,
				}}
			/>
		</View>
	);
}
