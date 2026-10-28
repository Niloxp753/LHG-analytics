'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';
import { getHelpdeskToken } from './helpdesk-token';

type HelpdeskApi = {
	init: (options: { sistema: 'lhg-analytics'; getToken: () => Promise<string> }) => void;
	destroy: () => void;
};

declare global {
	interface Window {
		LHGHelpdesk?: HelpdeskApi;
	}
}

export default function HelpdeskWidget() {
	const active = useRef(false);
	const instance = useRef<HelpdeskApi | null>(null);
	const initialize = useCallback(() => {
		const helpdesk = window.LHGHelpdesk;
		if (!active.current || instance.current || !helpdesk) return;
		helpdesk.init({ sistema: 'lhg-analytics', getToken: () => getHelpdeskToken() });
		instance.current = helpdesk;
	}, []);

	useEffect(() => {
		active.current = true;
		// Also restore an already loaded widget after effect cleanup/replay.
		initialize();
		return () => {
			active.current = false;
			instance.current?.destroy();
			instance.current = null;
		};
	}, [initialize]);

	return (
		<Script
			id='lhg-helpdesk-widget'
			src='https://helpdesk.lhgmoteis.com.br/widget.js'
			strategy='afterInteractive'
			onReady={initialize}
			onError={() => console.error('LHG Help Desk: falha ao carregar o widget')}
		/>
	);
}
