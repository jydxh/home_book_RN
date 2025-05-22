export type FetchedProductsResponse = {
	data: {
		totalPage: number;
		currentPage: number;
		totalCount: number;
		data: {
			totalPage: number;
			currentPage: string | number;
			totalCount: number;
			data: {
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
			}[];
		}[];
	};
};
