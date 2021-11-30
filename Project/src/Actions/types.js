//export const ENABLED_SIGNIN = 'ENABLED_SIGNIN';
//export const DISABLED_SIGNIN = 'DISABLED_SIGNIN';

export const CHANGE_SIGNINSTATE = 'CHANGE_SIGNINSTATE';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_ID = 'CHANGE_ID';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PHOTOURL = 'CHANGE_PHOTOURL';

export const setPhotoURL = photoURL => dispatch => {
	dispatch({
		type: CHANGE_PHOTOURL,
		payload: photoURL,
	});
}

export const setEmail = email => dispatch => {
	dispatch({
		type: CHANGE_EMAIL,
		payload: email,
	});
}

export const setID = id => dispatch => {
	dispatch({
		type: CHANGE_ID,
		payload: id,
	});
}

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