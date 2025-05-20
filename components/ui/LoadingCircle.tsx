// SpinningCircle.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

export default function LoadingCircle({ size = 24, color = "#334155" }) {
	const spinAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinAnim, {
				toValue: 1,
				duration: 1200,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	}, [spinAnim]);

	const spin = spinAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<Animated.View
			style={[
				styles.circle,
				{
					width: size,
					height: size,
					borderTopColor: color,
					borderRightColor: "white",
					borderBottomColor: "white",
					borderLeftColor: "white",
					transform: [{ rotate: spin }],
				},
			]}
		/>
	);
}

const styles = StyleSheet.create({
	circle: {
		borderWidth: 2,
		borderRadius: 999,
		borderRightColor: "transparent",
	},
});
