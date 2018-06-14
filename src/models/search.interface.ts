import { Address } from './location/address.interface';

export interface Search{
	apartment_type: string;
	Address: Address;
	maxPrice: number;
	minPrice: number;
	nearby?: string;
	nsfas: boolean;
	parking: boolean;
	searcher_id?: string;
	searcher_name?: string;
	timeStamp: number;
	wifi?: boolean;
	laundry?: boolean;
	other?: boolean;
}