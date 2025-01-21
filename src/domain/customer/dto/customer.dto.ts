export interface CustomerListItem {
	id?: number;
	guid: string;
	cif: string;
	name: string;
	description: string;
	origins: string[];
	active: boolean;
	created_on: Date;
	updated_on: Date;
}

export interface CustomerDetail extends CustomerListItem {
	origins: string[];
}

export interface CustomerScorm {
	id: number;
	guid: string;
	name: string;
	slots: number;
	duration: number;
	created_on: Date;
}
