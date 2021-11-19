import { CHANGE_SIGNINSTATE, CHANGE_NAME } from '../Actions/types';
import { useSelector } from 'react-redux';

const initialState = {
	name: '',
	isSignedIn: false,
}

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
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

export default loginReducer;