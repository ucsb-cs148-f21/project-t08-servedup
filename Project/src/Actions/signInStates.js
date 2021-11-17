

import CHANGE_SIGNINSTATE from './types';
export const changeSignInOut = (name, isSignedIn) => (
	{
		dataName: name,
		dataIsSignIn: isSignedIn
	}
)

/*{ENABLED_SIGNIN, DISABLED_SIGNIN } from './types';

const signIn = (loginVariable) => (
	{
		type: ENABLED_SIGNIN,
		data: loginVariable
	}
)

const signOut = (loginVariable) => (
	{
		type: DISABLED_SIGNIN,
		data: loginVariable
	}
)*/
