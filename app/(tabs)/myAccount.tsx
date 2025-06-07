import { useFetchUserProfile } from "@/api/userApi";
import UpdateMyInfo from "@/components/myAccount/UpdateMyInfo";
import UserInfo from "@/components/myAccount/UserInfo";
import HorizontalLine from "@/components/ui/HorizontalLine";
import MyButton from "@/components/ui/MyButton";
import { userDefaultAvatarUrl } from "@/constants/baseUrls";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const MyAccountPage = () => {
	const { signOut } = useClerk();
	const router = useRouter();
	const { data, isLoading, isError } = useFetchUserProfile();
	const [showUpdate, setShowUpdate] = useState(false);

	if (isLoading)
		return (
			<SafeAreaView
				edges={["left", "right", "bottom"]}
				className="item-center justify-center flex-1">
				<ActivityIndicator size={"large"} color="#FF6467" />
			</SafeAreaView>
		);

	if (isError) {
		return (
			<SafeAreaView
				edges={["left", "right", "bottom"]}
				className="item-center justify-center flex-1 px-4">
				<Text className="font-semibold text-2xl text-center mb-2">
					An error in fetching user profile
				</Text>
				<MyButton onPress={() => signOut()} text="Sign Out" />
			</SafeAreaView>
		);
	}
	if (data) {
		return (
			<SafeAreaView edges={["left", "right", "bottom"]} className="px-4">
				<View className="mt-4">
					<UserInfo
						imageUrl={data.profile?.profileImage || userDefaultAvatarUrl}
						role={(data.profile?.role || "user") as string}
						userName={data.profile?.userName || "unknown"}
					/>

					<HorizontalLine />
					<UpdateMyInfo
						visible={showUpdate}
						setIsShow={setShowUpdate}
						firstNameDefault={data.profile?.firstName || ""}
						lastNameDefault={data.profile?.lastName || ""}
						userNameDefault={data.profile?.userName || ""}
					/>
					<View className="gap-y-4">
						<MyButton
							text="Update My Info"
							onPress={() => setShowUpdate(true)}
						/>
						<MyButton
							text="My Review"
							onPress={() => router.push("/reviews")}
						/>
						<MyButton
							onPress={() => signOut()}
							text="Sign Out"
							bgColor="bg-red-400"
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
};
export default MyAccountPage;
