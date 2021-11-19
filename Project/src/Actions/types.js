//export const ENABLED_SIGNIN = 'ENABLED_SIGNIN';
//export const DISABLED_SIGNIN = 'DISABLED_SIGNIN';

export const CHANGE_SIGNINSTATE = 'CHANGE_SIGNINSTATE';
export const CHANGE_NAME = 'CHANGE_NAME';

export const setSignInState = isSignedIn => dispatch => {
	dispatch({
		type: CHANGE_SIGNINSTATE,
		payload: isSignedIn,
	});
};

export const setName = name => dispatch => {
	dispatch({
		type: CHANGE_NAME,
		payload: name,
	}); 
};