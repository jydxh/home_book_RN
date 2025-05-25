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
