const initialState = {
	name: "exampleUser",
	isSignedIn: false,
}



const loginReducer = (state = initialState, action) => {
	return {
		...state,
		name: action.dataName,
		isSignedIn: action.dataIsSignIn
	};
}
			
		

export default loginReducer;