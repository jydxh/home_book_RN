import { View, Image, FlatList } from "react-native";

export default function Carousel({ images }: { images: string[] }) {
	return (
		<View>
			<FlatList
				style={{ width: 180, height: 120 }}
				pagingEnabled
				data={images}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<Image
						source={{ uri: item }}
						style={{ width: 180, height: 120 }}
						resizeMode="cover"
					/>
				)}
			/>
		</View>
	);
}
