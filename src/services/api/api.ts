import { defaultFilter } from './api.constant';
import { IEvent, IParticipant, IUser } from './api.type';
import { Filter } from './loopback.type';

import apisauce, { ApiResponse } from 'apisauce';

export const baseURL =
	process.env.API_URL || 'https://api-checkin.code4change.dev';

export const defaultApiSauceConfig = (headers?: any) => {
	return {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...headers,
		},
		timeout: 10000,
	};
};

const createServiceApi = () => {
	const api = apisauce.create({
		...defaultApiSauceConfig(),
		baseURL: baseURL,
	});

	const getUserMe = async (token?: string) =>
		api.get<IUser>(
			'/users/me',
			{},
			{
				headers: {
					...api.headers,
					authorization: 'Bearer ' + token,
				},
			}
		);
	const login = async (data?: { email: string; password: string }) =>
		api.post('/users/login', data);

	const getUsers = async (filter?: Filter) =>
		api.get<{ data: IUser[]; count: number }>('/users', {
			filter,
		});

	const getUserById = async (userId: number, filter?: Filter) =>
		api.get('/users/' + userId, {
			filter,
		});

	const getGeneral = async () => api.get('/admin/general');

	const lockUserById = async (userId: number) =>
		api.post('/admin/lock-user/' + userId);

	const getAdminGeneral = async () => {
		const res = await api.get('/admin/general');

		if (isSuccess(res)) return res.data;

		return {};
	};

	const createMediaContent = async (data: any) =>
		api.post('/media-contents/', data, {
			headers: {
				...api.headers,
				'content-type': 'multipart/form-data',
			},
		});

	const getEvents = async (filter?: Filter) => {
		const res = await api.get<{ data: IEvent[]; count: number }>(
			'/events',
			{
				filter,
			}
		);

		console.log({ res });

		if (isSuccess(res)) return res.data;

		return { data: [], count: 0 };
	};

	const createEvent = async (data: IEvent) => api.post('/events', data);

	const editEvent = async (id: number, data: IEvent) =>
		api.patch('/events/' + id, data, {});

	const deleteEvent = async (id: number) => api.delete('/events/' + id);

	const getEventById = async (id: number, filter?: Filter) => {
		const res = await api.get<IEvent>('/events/' + id, { filter });

		if (isSuccess(res)) return res.data;

		return {};
	};

	const getParticipants = async (filter?: Filter) => {
		const res = await api.get<{ data: IParticipant[]; count: number }>(
			'/participants',
			{
				filter,
			}
		);

		if (isSuccess(res)) return res.data?.data || [];

		return [];
	};

	const createParticipant = async (data: IParticipant) =>
		api.post('/participants', data);

	const importParticipant = async (data: IParticipant[]) =>
		api.post('/participants/import', data);

	const editParticipant = async (id: number, data: IParticipant) =>
		api.patch('/participants/' + id, data, {});

	const deleteParticipant = async (id: number) =>
		api.delete('/participants/' + id);

	const getParticipantById = async (id: number, filter?: Filter) => {
		const res = await api.get<IParticipant>('/participants/' + id, {
			filter,
		});

		if (isSuccess(res)) return res.data;

		return {};
	};

	return {
		api,
		getUserMe,
		login,
		getUsers,
		getUserById,
		lockUserById,
		getAdminGeneral,
		createMediaContent,
		getEvents,
		createEvent,
		editEvent,
		deleteEvent,
		getEventById,
		getParticipants,
		importParticipant,
		createParticipant,
		editParticipant,
		deleteParticipant,
		getParticipantById,
		getGeneral,
	};
};

export const ServiceApi = createServiceApi();

export const setApiAuthorization = (token: string) => {
	ServiceApi.api.setHeaders({
		authorization: 'Bearer ' + token,
	});
};

export const removeToken = () => {
	ServiceApi.api.deleteHeader('authorization');
};
export const isSuccess = <T = any>(res: ApiResponse<T> & any) => {
	return res.ok && (res.status === 200 || res.status === 204);
};
