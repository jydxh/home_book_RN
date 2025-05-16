import { Text, TextInput, View } from "react-native";

export default function LoginComponents() {
	return (
		<View className="px-10">
			{/* google auth */}
			<View>
				<Text>Login With</Text>
				<Text>Place holder for google auth1</Text>
			</View>
			{/* hr */}
			<View className="my-10 flex-row justify-center items-center gap-x-2">
				<View className="border-b w-[50%] border-gray-300" />
				<Text>Or</Text>
				<View className="border-b w-[50%] border-gray-300" />
			</View>

			{/* pwd login */}
			<View className="gap-6">
				<View className="gap-2">
					<Text className="font-semibold text-lg">Email Address</Text>
					<TextInput
						textContentType="emailAddress"
						placeholder="please enter your email here"
						className="border rounded p-2"
					/>
					{/* eamil error */}
					<Text className="text-red-500">{"email error place holder"}</Text>
				</View>
				<View className="gap-2">
					<Text className="font-semibold text-lg">Password</Text>
					<TextInput
						secureTextEntry
						textContentType="password"
						placeholder="please enter your email here"
						className="border rounded p-2"
					/>
					{/* pwd error */}
					<Text className="text-red-500">{"email error place holder"}</Text>
				</View>
			</View>
		</View>
	);
}
