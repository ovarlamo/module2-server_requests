import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDQC9Lgj1Rq7Rt8j86lQAof9CF1Le77Tss',
	authDomain: 'todos-79cd5.firebaseapp.com',
	projectId: 'todos-79cd5',
	storageBucket: 'todos-79cd5.firebasestorage.app',
	messagingSenderId: '975673794468',
	appId: '1:975673794468:web:8fddb989b2628f43d82b31',
	databaseURL: 'https://todos-79cd5-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
