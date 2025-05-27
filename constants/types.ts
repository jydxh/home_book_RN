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
	image: {
		imageUrl: string;
		id: string;
	}[];
	reviews: any[]; //  might want to define a proper Review interface
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
	amenities: any[]; //  might want to define a proper Amenity interface
	orders: {
		id: string;
		userId: string;
		propertyId: string;
		orderTotal: number;
		totalNight: number;
		checkIn: string | Date;
		checkOut: string | Date;
		createdAt: string | Date;
		updatedAt: string | Date;
		paymentStatus: boolean;
		orderStatus: string; // Consider using a union type for possible statuses
	}[];
};

// If you want more specific types for some fields, you could define:
export type OrderStatus = "CHECKED" | "PENDING" | "CANCELLED" | "COMPLETED"; // etc.

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
	checkIn: string | Date;
	checkOut: string | Date;
	createdAt: string | Date;
	updatedAt: string | Date;
	paymentStatus: boolean;
	orderStatus: OrderStatus;
};
