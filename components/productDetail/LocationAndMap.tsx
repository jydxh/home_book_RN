import { Text, View } from "react-native";
import MapComponent from "./MapComponent";

export default function LocationAndMap({
	lat,
	lng,
	address,
}: {
	lat: number;
	lng: number;
	address: string;
}) {
	return (
		<View>
			<Text className="text-xl font-semibold">Location:</Text>
			<Text className="text-gray-600 my-2">{address}</Text>
			<View style={{ height: 400, borderRadius: 12, overflow: "hidden" }}>
				<MapComponent lat={lat} lng={lng} />
			</View>
		</View>
	);
}
