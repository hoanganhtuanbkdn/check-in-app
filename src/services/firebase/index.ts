import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, set } from 'firebase/database';
import { IParticipant } from '../api';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyAghHRKt1HVfWN4nHTTQcV8-M6UiW3t20I',
	authDomain: 'checkin-event-1.firebaseapp.com',
	projectId: 'checkin-event-1',
	storageBucket: 'checkin-event-1.appspot.com',
	messagingSenderId: '1011190346364',
	appId: '1:1011190346364:web:452fc1deae2664c6f38ff9',
	measurementId: 'G-RPGTK8HG3K',
	databaseURL:
		'https://checkin-event-1-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const updateNewParticipantCheckIn = (
	eventId: number,
	participantInformation: IParticipant
) => {
	const db = getDatabase();
	set(ref(db, 'check-in/' + eventId + '/' + participantInformation.id), {
		...participantInformation,
	});
};
