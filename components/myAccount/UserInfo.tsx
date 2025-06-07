import { useUpdateAvatar } from "@/api/userApi";
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { toLower } from "lodash";
import React, { useState } from "react";
import {
	Dimensions,
	Image,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import MyButton from "../ui/MyButton";
export default function UserInfo({
	imageUrl,
	role,
	userName,
}: {
	imageUrl: string;
	userName: string;
	role: string;
}) {
	const [showModal, setShowModal] = useState(false);
	const [image, setImage] = useState<string>(imageUrl);

	const onError = () => {
		Toast.show({
			type: "error",
			text1: "failed in update the avatar",
			text1Style: { fontSize: 16 },
		});
	};
	const onSuccess = () => {
		Toast.show({
			type: "success",
			text1: "Avatar updated successfully!",
			text1Style: { fontSize: 16 },
		});
	};
	const { mutate } = useUpdateAvatar({
		onError,
		onSuccess,
	});

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const handlePressAvatar = () => {
		/* handling the pick up image logic here */
		pickImage();
		setShowModal(true);
	};

	const handleReset = () => {
		setImage(imageUrl);
		setShowModal(false);
	};

	const handleUploadAvatar = async () => {
		if (image === imageUrl) return;
		const maxSize = 1024 * 1024 * 1;
		const fileInfo = await FS.getInfoAsync(image);
		console.log(fileInfo);
		if (!fileInfo.exists) {
			return Toast.show({
				type: "error",
				text1: "File does not exist.",
				text1Style: { fontSize: 16 },
			});
		}
		if (fileInfo.size && fileInfo.size > maxSize) {
			return Toast.show({
				type: "error",
				text1: "Image size must be less than 1MB.",
				text1Style: { fontSize: 16 },
			});
		}
		const formData = new FormData();
		formData.append("avatar", {
			uri: image,
			name: "avatar.jpg",
			type: "image/jpeg",
		} as any);

		mutate({ formData, imageUri: fileInfo.uri });
		setShowModal(false);
	};
	return (
		<View className="flex-row justify-between items-center px-10">
			<TouchableOpacity onPress={handlePressAvatar}>
				<Image
					className="rounded-full"
					width={100}
					height={100}
					source={{
						uri: imageUrl,
					}}
				/>
			</TouchableOpacity>
			<Modal
				visible={showModal}
				animationType="slide"
				transparent={false}
				backdropColor={"rgba(255,255,255,0.2)"}>
				<Toast />
				<View className="flex-1 justify-center items-center">
					<View className="bg-white p-8 rounded-lg w-full gap-y-4">
						<Image
							className="mx-auto"
							width={Dimensions.get("window").width * 0.85}
							height={Dimensions.get("window").width * 0.85}
							resizeMode="cover"
							source={{ uri: image }}
						/>
						<View className="flex-row justify-between items-center px-10 mt-4">
							<MyButton
								text="Reset"
								wrapperClassName="w-[40%]"
								onPress={handleReset}
							/>
							<MyButton
								text="Use the Image"
								wrapperClassName="w-[40%]"
								bgColor="bg-red-400"
								onPress={handleUploadAvatar}
							/>
						</View>
					</View>
				</View>
			</Modal>
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
