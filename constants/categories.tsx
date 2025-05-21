import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const iconHelper = (name: any, size: number, color: string) => (
	<MaterialIcons name={name} size={size} color={color} />
);

export const categories = [
	{
		label: "Cabin",
		id: "10",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("cabin", size, color),
	},
	{
		label: "Villa",
		id: "20",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("villa", size, color),
	},
	{
		label: "Cottage",
		id: "30",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("cottage", size, color),
	},
	{
		label: "Loft",
		id: "40",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("bedroom-child", size, color),
	},
	{
		label: "Farmhouse",
		id: "50",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("warehouse", size, color),
	},
	{
		label: "Chalet",
		id: "60",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("chalet", size, color),
	},
	{
		label: "Castle",
		id: "70",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("castle", size, color),
	},
	{
		label: "Tent",
		id: "80",
		icon: ({
			color = "black",
			size = 24,
		}: {
			color?: string;
			size?: number;
		}) => <FontAwesome6 name="tent" size={size} color={color} />,
	},
	{
		label: "Other",
		id: "90",
		icon: ({ color = "black", size = 24 }: { color?: string; size?: number }) =>
			iconHelper("other-houses", size, color),
	},
];
