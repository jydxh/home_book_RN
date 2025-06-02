import { Property } from "@/constants/types";
import calculateYearDiff from "@/utils/calculateYearDiff";
import { useAuth } from "@clerk/clerk-expo";
import moment from "moment";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "../ui/Carousel";
import CountryWithFlag from "../ui/CountryWithFlag";
import HorizontalLine from "../ui/HorizontalLine";
import { FavButton } from "../ui/MyButton";
import Amenities from "./Amenities";
import BookingComponent from "./Booking";
import LocationAndMap from "./LocationAndMap";
import ProductDescription from "./ProductDescription";
import RatingStar from "./RatingStar";

const { width } = Dimensions.get("window");

function ProductDetail({
	product,
	isFav,
}: {
	product: Property;
	isFav: boolean;
}) {
	const latLngObject = JSON.parse(product.latLng) as {
		lat: number;
		lng: number;
	};
	// console.log("order:", JSON.stringify(product.orders, null, 2));
	const { isSignedIn } = useAuth();

	return (
		<>
			{isSignedIn && (
				<>
					<View className="mt-8 ml-4">
						<FavButton productId={product.id} isFav={isFav} withText={true} />
					</View>
					<HorizontalLine />
				</>
			)}
			{/* carousel */}
			<View className="mx-4 mt-2 rounded-lg overflow-hidden">
				<Carousel
					images={product.image.map(i => i.imageUrl)}
					flatListStyle={{ width, height: 300 }}
					imageStyle={{ width, height: 300 }}
				/>
			</View>
			<HorizontalLine />
			{/* country and flag */}
			<View className="px-2">
				<CountryWithFlag
					spaceBetween={false}
					country={product.country}
					textClassName="text-xl font-semibold"
					imageStyle={{ width: 30, height: 20 }}
				/>
				{/* room info */}
				<Text className="mt-2 ml-2 text-lg">
					{product.bedrooms} bedroom{product.bedrooms > 1 && "s"} &middot;{" "}
					{product.guests} guest{product.guests > 1 && "s"} &middot;{" "}
					{product.baths} bath {product.baths > 1 && "s"}
				</Text>
				<View className="flex-row gap-x-2 ml-2">
					<Text className="text-lg">Rating:</Text>
					<RatingStar rate={product.rating} />
				</View>

				{/* host info */}
				<View className="flex-row justify-start gap-x-4 mt-4">
					<Image
						source={{ uri: product.user.profileImage }}
						width={55}
						height={55}
						className="rounded-full ml-2"
					/>
					<View className="justify-center gap-y-1">
						<Text className="text-lg font-semibold">
							Hosted by {product.user.userName}
						</Text>
						<Text className="text-lg font-light">
							SuperHost &middot; {calculateYearDiff(product.user.createAt)}{" "}
							hosting
						</Text>
					</View>
				</View>
			</View>
			<HorizontalLine />
			{/* product description */}
			<View className="px-2">
				<ProductDescription description={product.description} />
			</View>

			<HorizontalLine />

			{/* Amenities */}
			<View className="px-2">
				<Amenities amenitiesId={product.amenities.map(a => a.amenitiesId)} />
			</View>
			<HorizontalLine />
			{/* location and map */}
			<View className="px-2">
				<LocationAndMap
					lat={latLngObject.lat}
					lng={latLngObject.lng}
					address={product.address}
				/>
			</View>
			<HorizontalLine />
			{/* booking  */}
			<View className="px-2">
				<BookingComponent
					bookings={product.orders.map(o => ({
						checkIn: o.checkIn,
						checkOut: o.checkOut,
					}))}
					name={product.name}
					image={product.image[0].imageUrl}
					price={product.price}
					productId={product.id}
					rate={product.rating}
					totalReview={product.reviews.length}
					disabledDateRange={product.orders.map(o => ({
						start: moment(o.checkIn).format("YYYY-MM-DD"),
						end: moment(o.checkOut).subtract(1, "day").format("YYYY-MM-DD"), // subtract end day by 1, so the last night be can selected by other user
					}))}
				/>
			</View>
		</>
	);
}

export default ProductDetail;
