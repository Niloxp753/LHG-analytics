/** @format */

import SessionStoreProvider from '@/providers/session-store-provider';
import React from 'react';

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <SessionStoreProvider>{children}</SessionStoreProvider>;
}
