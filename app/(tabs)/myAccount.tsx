import { useClerk } from "@clerk/clerk-expo";
import { Button, View } from "react-native";
const MyAccountPage = () => {
	const { signOut } = useClerk();
	return (
		<View>
			<Button onPress={() => signOut()} title="sign out" />
		</View>
	);
};
export default MyAccountPage;
