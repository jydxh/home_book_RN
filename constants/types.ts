export type ProductType = {
	tagline: string;
	name: string;
	id: string;
	country: string;
	price: number;
	latLng: string;
	image: {
		id: string;
		propertyId: string;
		imageUrl: string;
	}[];
};

export type ProductWithAmenitiesType = ProductType & {
	amenities: {
		propertyId: string;
		amenitiesId: string;
	}[];
};

export type FetchedProductsResponse = {
	data: {
		totalPage: number;
		currentPage: number;
		totalCount: number;
		data: ProductType[];
	};
};

export type FetchedFavListDetailResponse = {
	data: ProductType[];
};

export type Property = {
	id: string;
	name: string;
	tagline: string;
	categoryId: string;
	country: string;
	description: string;
	price: number;
	guests: number;
	bedrooms: number;
	baths: number;
	address: string;
	latLng: string;
	createdAt: string | Date;
	updatedAt: string | Date;
	userId: string;
	rating: {
		rating: string;
		count: number;
	};
	image: {
		imageUrl: string;
		id: string;
	}[];
	reviews: Review[];
	user: {
		id: number;
		clerkId: string;
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		country: string;
		city: string;
		state: string;
		profileImage: string;
		createAt: string | Date;
		updateAt: string | Date;
		role: string;
	};
	amenities: Amenity[];
	orders: Order[];
};

export type Review = {
	id: string;
	rating: number;
	comment: string;
	createAt: string | Date;
	propertyId: string;
	user: {
		city: string;
		country: string;
		firstName: string;
		profileImage: string;
	};
};

export type Amenity = {
	propertyId: string;
	amenitiesId: string;
};

export type OrderStatus = "CHECKED" | "PENDING" | "CANCELLED";

export type User = {
	id: number;
	clerkId: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	country: string;
	city: string;
	state: string;
	profileImage: string;
	createAt: string | Date;
	updateAt: string | Date;
	role: string;
};

export type Order = {
	id: string;
	userId: string;
	propertyId: string;
	orderTotal: number;
	totalNight: number;
	checkIn: Date;
	checkOut: Date;
	createdAt: Date;
	updatedAt: Date;
	paymentStatus: boolean;
	orderStatus: OrderStatus;
};

export type Booking = {
	checkIn: Date;
	checkOut: Date;
};

export type ReviewDetail = {
	id: string;
	rating: number;
	comment: string;
	createAt: Date;
	user: {
		createAt: Date;
		clerkId: string;
		firstName: string;
		country: string | null;
		city: string | null;
		profileImage: string | null;
	};
};

export type ReviewResponse = {
	reviews: Review[];
};

export type OrdersListResponse = {
	bookings: OrdersList[];
};

export type OrdersList = {
	property: {
		name: string;
		image: {
			imageUrl: string;
		}[];
	};
	id: string;
	checkIn: Date;
	checkOut: Date;
	createdAt: Date;
	totalNight: number;
	orderStatus: OrderStatus;
}[];
