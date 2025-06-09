import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapComponent({
	lat,
	lng,
}: {
	lat: number;
	lng: number;
}) {
	return (
		<MapView
			style={{ flex: 1 }}
			provider={PROVIDER_GOOGLE}
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
	);
}
