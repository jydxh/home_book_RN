import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

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
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: lat,
						longitude: lng,
						latitudeDelta: 0.1,
						longitudeDelta: 0.1,
					}}
					scrollEnabled={false}>
					<Marker
						coordinate={{
							latitude: lat,
							longitude: lng,
						}}
						opacity={0.7}
					/>
				</MapView>
			</View>
		</View>
	);
}
