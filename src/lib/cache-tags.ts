/** @format */

export const AUTH_CACHE_TAGS = [
	'company',
	'company_liv',
	'operational',
	'operational_liv',
	'reservations',
	'reservations_liv',
	'restaurant',
	'restaurant_ipiranga',
	'restaurant_lapa',
	'restaurant_tout',
	'restaurant_andar_de_cima',
	'restaurant_liv',
	'users',
] as const;

export type AuthCacheTag = (typeof AUTH_CACHE_TAGS)[number];
