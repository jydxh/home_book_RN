import { useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Button, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
	const { signOut } = useClerk();
	return (
		<SafeAreaView className="flex-1 bg-red-300  justify-center content-center">
			<Button onPress={() => signOut()} title="sign out" />
			<View className="mx-auto mt-2">
				<Link href={"/login"} className="bg-sky-400 p-4 rounded  w-[18rem]">
					to login page
				</Link>
			</View>
		</SafeAreaView>
	);
}
