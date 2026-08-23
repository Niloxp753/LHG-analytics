export type UserActionFailureCode =
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'SESSION_UNAVAILABLE'
	| 'UPSTREAM_ERROR';

export type UserActionFailure = { ok: false; code: UserActionFailureCode };
export type UserActionSuccess<T> = { ok: true; data: T };
export type UserActionResult<T> = UserActionSuccess<T> | UserActionFailure;

export const userActionFailure = (
	code: UserActionFailureCode,
): UserActionFailure => ({ ok: false, code });

export const userActionSuccess = <T>(data: T): UserActionSuccess<T> => ({
	ok: true,
	data,
});

export function userActionFailureCopy(code: UserActionFailureCode) {
	switch (code) {
		case 'UNAUTHORIZED':
			return { title: 'Sessão expirada', description: 'Entre novamente para continuar.' };
		case 'FORBIDDEN':
			return { title: 'Acesso negado', description: 'Apenas administradores podem gerenciar usuários.' };
		case 'SESSION_UNAVAILABLE':
			return { title: 'Sessão temporariamente indisponível', description: 'Tente novamente em instantes.' };
		case 'UPSTREAM_ERROR':
			return { title: 'Serviço de usuários indisponível', description: 'Não foi possível concluir a operação. Tente novamente.' };
	}
}
