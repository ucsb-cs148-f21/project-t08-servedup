

import CHANGE_SIGNINSTATE from './types';
export const changeSignInOut = (name, isSignedIn) => (
	{
		type: 'CHANGE_SIGNINSTATE',
		dataName: name,
		dataIsSignIn: isSignedIn
	}
);


