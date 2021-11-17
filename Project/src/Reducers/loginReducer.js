const initialState = {
	name: "exampleUser",
	isSignedIn: false,
}

/*const loginReducer = ( state = initialState, action ) => {
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
}*/

const loginReducer = (state = initialState, action) => {
	return {
		...state,
		name: action.dataName,
		isSignedIn: action.dataIsSignIn
	};
}
			
		

export default loginReducer;