import React from "react";

export default function MapComponent({
	lat,
	lng,
}: {
	lat: number;
	lng: number;
}) {
	return (
		<div
			style={{
				height: 400,
				width: "100%",
				borderRadius: 12,
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#eee",
			}}>
			<span>Map only available on mobile devices</span>
		</div>
	);
}
