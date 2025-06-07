import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
const _layout = () => {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "#FF6467" }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={26} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="myFavList"
				options={{
					title: "My Favorite",
					headerTitle: "My Favorite Property List",
					headerTitleAlign: "center",
					headerBackground: () => (
						<LinearGradient
							colors={["#E5E7EB", "#D6D3D1"]}
							style={{
								borderBottomWidth: 1,
								borderBottomColor: "#F3F4F6",
								flex: 1,
							}}
						/>
					),
					tabBarIcon: ({ color }) => (
						<Fontisto name="favorite" size={26} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="myOrder"
				options={{
					title: "My Order",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="cart-variant"
							size={26}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="myAccount"
				options={{
					title: "My Account",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" size={26} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};
export default _layout;
