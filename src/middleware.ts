/** @format */

export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/',
		'/general',
		'/settings',
		'/not-found',
		'/nps',
		'/operational',
		'/restaurant',
	],
};
