import { toLower } from "lodash";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UserInfo({
	imageUrl,
	role,
	userName,
}: {
	imageUrl: string;
	userName: string;
	role: string;
}) {
	return (
		<View className="flex-row justify-between items-center px-10">
			<TouchableOpacity>
				<Image
					className="rounded-full"
					width={100}
					height={100}
					source={{
						uri: imageUrl,
					}}
				/>
			</TouchableOpacity>

			<View>
				<View className="flex-row items-center gap-x-2">
					<Text className="font-semibold text-lg">UserName:</Text>
					<Text className="text-lg">{userName}</Text>
				</View>
				<View className="flex-row items-center gap-x-2">
					<Text className="font-semibold text-lg">Role:</Text>
					<Text className="text-lg capitalize">{toLower(role)}</Text>
				</View>
			</View>
		</View>
	);
}
