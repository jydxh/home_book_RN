import { View, Text } from "react-native";
import { amenities, type Amenity } from "@/utils/amenityList";

export default function Amenities({ amenitiesId }: { amenitiesId: string[] }) {
	let renderAmenity: Amenity[] = [];
	amenitiesId.forEach(id => {
		const exists = amenities.find(a => a.id === id);
		if (exists) renderAmenity = [...renderAmenity, exists];
	});
	return (
		<View>
			<Text className="font-semibold text-xl">Amenities:</Text>
			<View className="flex-row flex-wrap gap-4 mt-4">
				{renderAmenity.map(a => (
					<View key={a.id} className="flex-row gap-x-2 items-center">
						{<a.icon name={a.iconName} />}
						<Text>{a.name}</Text>
					</View>
				))}
			</View>
		</View>
	);
}
