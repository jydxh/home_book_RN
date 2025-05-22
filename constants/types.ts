export type ProductType = {
	tagline: string;
	name: string;
	amenities: {
		propertyId: string;
		amenitiesId: string;
	}[];
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

export type FetchedProductsResponse = {
	data: {
		totalPage: number;
		currentPage: number;
		totalCount: number;
		data: ProductType[];
	};
};
