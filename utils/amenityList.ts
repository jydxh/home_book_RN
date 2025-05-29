import {
	FontAwesome5,
	MaterialIcons,
	Entypo,
	Feather,
} from "@expo/vector-icons";
import type { ComponentType } from "react";
//import type { TextProps } from "react-native";

export type Amenity = {
	name: string;
	icon: ComponentType<any>;
	id: string;
	iconName: string;
};

export const amenities: Amenity[] = [
	{ name: "WiFi", icon: FontAwesome5, id: "113", iconName: "wifi" },
	{ name: "Swimming Pool", icon: MaterialIcons, id: "107", iconName: "pool" },
	{
		name: "Parking",
		icon: MaterialIcons,
		id: "117",
		iconName: "local-parking",
	},
	{ name: "TV", icon: Entypo, id: "104", iconName: "tv" },
	{ name: "Kitchen", icon: MaterialIcons, id: "119", iconName: "kitchen" },
	{ name: "Gym", icon: MaterialIcons, id: "108", iconName: "fitness-center" },
	{ name: "Spa", icon: MaterialIcons, id: "106", iconName: "spa" },
	{
		name: "Concierge",
		icon: MaterialIcons,
		id: "112",
		iconName: "room-service",
	},
	{
		name: "Coffee Maker",
		icon: MaterialIcons,
		id: "110",
		iconName: "coffee-maker",
	}, // fallback: "local-cafe"
	{ name: "Shower", icon: FontAwesome5, id: "114", iconName: "shower" },
	{ name: "Bathtub", icon: FontAwesome5, id: "116", iconName: "bath" },
	{ name: "Air Conditioning", icon: Feather, id: "109", iconName: "wind" },
	{ name: "Heating", icon: MaterialIcons, id: "111", iconName: "whatshot" },
	{
		name: "Bicycle Rental",
		icon: FontAwesome5,
		id: "103",
		iconName: "bicycle",
	},
	{ name: "Pet Friendly", icon: FontAwesome5, id: "120", iconName: "dog" },
	{ name: "Game Room", icon: FontAwesome5, id: "101", iconName: "gamepad" },
	{ name: "Garden", icon: Entypo, id: "115", iconName: "tree" },
	{ name: "Music System", icon: FontAwesome5, id: "118", iconName: "music" },
	{ name: "Bar", icon: FontAwesome5, id: "102", iconName: "beer" },
	{
		name: "Playground",
		icon: MaterialIcons,
		id: "105",
		iconName: "child-care",
	},
];
