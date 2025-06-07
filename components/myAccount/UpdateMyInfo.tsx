import { useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
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
	const handleUpdate = () => {};
	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={visible}
			backdropColor={"rgba(255,255,255,0.2)"}>
			<View className="flex-1 flex justify-center items-center">
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
							onPress={() => setIsShow(false)}
							wrapperClassName="w-[45%]"
						/>
						<MyButton
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
