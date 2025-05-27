import {
	View,
	Image,
	FlatList,
	StyleProp,
	ViewStyle,
	ImageStyle,
} from "react-native";

export default function Carousel({
	images,
	flatListStyle = { width: 180, height: 120 },
	imageStyle = { width: 180, height: 120 },
}: {
	images: string[];
	flatListStyle?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
}) {
	return (
		<View>
			<FlatList
				style={flatListStyle}
				pagingEnabled
				data={images}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<Image source={{ uri: item }} style={imageStyle} resizeMode="cover" />
				)}
			/>
		</View>
	);
}
