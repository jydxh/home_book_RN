import { useUpdateUserProfile } from "@/api/userApi";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import MyButton from "../ui/MyButton";

const InputField = ({
	value,
	onChangeValue,
	label,
}: {
	label: string;
	value: string;
	onChangeValue: (state: string) => void;
}) => {
	return (
		<View className="flex-row items-center  gap-x-4">
			<Text className="text-lg">{label}</Text>
			<TextInput
				value={value}
				onChangeText={onChangeValue}
				className="border rounded border-gray-300 w-[70%] text-lg pl-2"
			/>
		</View>
	);
};

export default function UpdateMyInfo({
	visible,
	setIsShow,
	firstNameDefault,
	lastNameDefault,
	userNameDefault,
}: {
	visible: boolean;
	setIsShow: (state: boolean) => void;
	userNameDefault: string;
	firstNameDefault: string;
	lastNameDefault: string;
}) {
	const [userName, setUserName] = useState(userNameDefault);
	const [firstName, setFirstName] = useState(firstNameDefault);
	const [lastName, setLastName] = useState(lastNameDefault);
	const [fieldChanged, setFieldChanged] = useState(false);
	const onError = () =>
		Toast.show({
			type: "error",
			text1: "Update failed, please try again",
			text1Style: { fontSize: 16 },
		});

	const onSuccess = () => {
		/* 2s delay for showing the toast */
		setTimeout(() => setIsShow(false), 2000);
		Toast.show({
			type: "success",
			text1: "Updated!",
			text1Style: { fontSize: 16 },
		});
	};

	const { isPending, mutate } = useUpdateUserProfile({
		firstName,
		lastName,
		userName,
		onSuccess,
		onError,
	});

	useEffect(() => {
		if (
			userName !== userNameDefault ||
			firstName !== firstNameDefault ||
			lastName !== lastNameDefault
		) {
			setFieldChanged(true);
		} else if (
			userName === userNameDefault &&
			firstName === firstNameDefault &&
			lastName === lastNameDefault
		) {
			setFieldChanged(false);
		}
	}, [
		userName,
		userNameDefault,
		firstName,
		firstNameDefault,
		lastName,
		lastNameDefault,
	]);

	const handleUpdate = () => {
		if (
			userName === userNameDefault &&
			firstName === firstNameDefault &&
			lastName === lastNameDefault
		) {
			Toast.show({
				type: "error",
				text1: "You did not make any changes",
				text1Style: { fontSize: 16 },
			});
			return;
		}
		if (!userName || !lastName || !firstName) {
			Toast.show({
				type: "error",
				text1: "Fields are all required!",
				text1Style: { fontSize: 16 },
			});
			return;
		}

		/* update logic with the onSuccess and onError Toast*/
		mutate();
	};
	const handleClose = () => {
		setIsShow(false);
		setFirstName(firstNameDefault);
		setLastName(lastNameDefault);
		setUserName(userNameDefault);
	};
	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={visible}
			backdropColor={"rgba(255,255,255,0.2)"}>
			<Toast />
			<View className="flex-1  justify-center items-center">
				<View className="bg-white p-10 rounded-lg w-full gap-y-2">
					<Text className="text-center font-bold text-2xl mb-4">
						Update My Info
					</Text>
					<InputField
						label="User Name: "
						onChangeValue={setUserName}
						value={userName}
					/>
					<InputField
						label="First Name: "
						onChangeValue={setFirstName}
						value={firstName}
					/>
					<InputField
						label="Last Name: "
						onChangeValue={setLastName}
						value={lastName}
					/>

					<View className="flex-row justify-between items-center mt-4">
						<MyButton
							text="Close"
							disabled={isPending}
							onPress={handleClose}
							wrapperClassName="w-[45%]"
						/>
						<MyButton
							disabled={!fieldChanged || isPending}
							spinning={isPending}
							text="Update"
							wrapperClassName="w-[45%]"
							bgColor="bg-red-400"
							onPress={handleUpdate}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
}
