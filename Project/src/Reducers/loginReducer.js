import { ENABLED_SIGNIN, DISABLED_SIGNIN } from '.../Actions/types'

const initialState = {
	name: "exampleUser",
	isSignedIn: false,
}

const loginReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case ENABLED_SIGNIN:
			return {...state,
				name: state.name,
				isSignedIn: true
			};
		case DISABLED_SIGNIN:
			return {...state,
				name: "Not Signed In",
				isSignedIn: false
			};
		default:
			return state;
	}
}
			
		

export default loginReducer;