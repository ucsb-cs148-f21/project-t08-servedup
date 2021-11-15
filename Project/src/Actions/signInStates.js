import {ENABLED_SIGNIN, DISABLED_SIGNIN } from './types';

export const signIn = (loginVariable) => (
	{
		type: ENABLED_SIGNIN,
		data: loginVariable
	}
)

export const signOut = (loginVariable) => (
	{
		type: DISABLED_SIGNIN,
		data: loginVariable
	}
)