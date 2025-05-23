import { calculateDistance } from "@/utils/calculateDistance";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
function DistanceAway({ latLng }: { latLng: string }) {
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const [distance, setDistance] = useState<number | null>(null);
	const latLngObj = JSON.parse(latLng) as { lat: number; lng: number };
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			let loc = await Location.getCurrentPositionAsync({});

			setLocation({
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
			});
		})();
	}, []);

	useEffect(() => {
		if (location)
			setDistance(
				calculateDistance(
					location.latitude,
					location.longitude,
					latLngObj.lat,
					latLngObj.lng
				)
			);
	}, [location, latLngObj.lat, latLngObj.lng]);

	return (
		<View>
			<Text>
				{distance !== null ? `${distance.toFixed()} km away` : "Calculating..."}
			</Text>
		</View>
	);
}
export default DistanceAway;
