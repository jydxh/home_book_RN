import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
const _layout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="myFavList"
				options={{
					title: "My Favorite",
					tabBarIcon: ({ color }) => (
						<Fontisto name="favorite" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="myOrder"
				options={{
					title: "My Order",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="cart-variant"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="myAccount"
				options={{
					title: "My Account",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="account"
							size={size ?? 24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};
export default _layout;
