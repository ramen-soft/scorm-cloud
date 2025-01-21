export interface ScormListItem {
	id: number;
	guid: string;
	name: string;
	status: boolean;
}

export interface ScormResource {
	id: number;
	guid: string;
	identifier: string;
	href: string;
	type: string;
	files: string[];
}

export interface ScormItem {
	id: number;
	guid: string;
	name: string;
	resource: ScormResource;
}

export interface ScormDetail {
	id: number;
	guid: string;
	name: string;
	status: boolean;
	items: ScormItem[];
}
