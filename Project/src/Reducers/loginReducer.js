import { CHANGE_SIGNINSTATE, CHANGE_NAME, CHANGE_EMAIL, CHANGE_ID, CHANGE_PHOTOURL } from '../Actions/types';
import { useSelector } from 'react-redux';

const initialState = {
	name: 'a',
	isSignedIn: false,
	id: 'a',
	email: 'as',
	photoURL: 'asd',
}

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_ID:
			return {
				...state,
				id: action.payload
			};

		case CHANGE_EMAIL:
			return {
				...state,
				email: action.payload
			};

		case CHANGE_PHOTOURL:
			return {
				...state,
				photoURL: action.payload
			};

		case CHANGE_SIGNINSTATE:
			return {
				...state,
				isSignedIn: action.payload
			};

		case CHANGE_NAME:
			return {
				...state,
				name: action.payload
			};

		default:
			return state

	}
};

export function getName() {
	return useSelector((state) => state.name);
}
export function getSignInState() {
	return useSelector((state) => state.isSignedIn);
}
export function getID() {
	return useSelector((state) => state.id);
}
export function getEmail() {
	return useSelector((state) => state.email);
}
export function getPhotoURL() {
	return useSelector((state) => state.photoURL);
}

export default loginReducer;