export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
}

export interface IMedia {
	id: number;
	filePath: string;
	mediaType: 'IMAGE';
	key: string;
	blurKey: string;
	videoKey: any;
	url: string;
	urlBlur: string;
	videoUrl: any;
	sourceType: string;
	size: number;
	width: number;
	height: number;
	dominantColor: string;
	palette: string;
	isAvatar: any;
	createdAt: string;
}

export interface IEvent {
	id?: number;
	name?: string;
	organizer?: string;
	area?: string;
	startDate?: string;
	createdAt?: string;
	updatedAt?: string;
	userId?: number;
	banner?: IMedia;
}

export interface IParticipant {
	name?: string;
	code?: string;
	position?: string;
	company?: string;
	gender?: string;
	checkInAt?: string;
	takeGiftAt?: string;
	createdAt?: string;
	note?: string;
	eventId?: number;
	event?: IEvent;
}
